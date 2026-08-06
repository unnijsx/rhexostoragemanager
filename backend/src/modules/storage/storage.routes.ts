import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../../config/prisma.js'
import { requireAuth, type AuthRequest } from '../../middleware/auth.middleware.js'

export const storageRouter = Router()
storageRouter.use(requireAuth)

type BreakdownRow = { kind: string; bytes: bigint | number | string | null }

function bytesToString(value: bigint | number | string | null | undefined) {
  if (value === null || value === undefined) return '0'
  return value.toString()
}

const routingModes = ['most_available', 'round_robin', 'priority'] as const
const routingPolicySchema = z.object({ mode: z.enum(routingModes), priorityAccountIds: z.array(z.string().min(1)).max(100).optional() })

function normalizePriorityAccountIds(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

async function getOrCreateRoutingPolicy(userId: string) {
  return prisma.uploadRoutingPolicy.upsert({
    where: { userId },
    create: { userId, mode: 'most_available', priorityAccountIds: [] },
    update: {},
  })
}

storageRouter.get('/summary', async (req: AuthRequest, res, next) => {
  try {
    const accounts = await prisma.connectedAccount.findMany({ where: { userId: req.user!.id, status: 'connected' }, include: { storageAccount: true } })
    const summary = accounts.reduce((acc, account) => {
      const storage = account.storageAccount
      acc.totalBytes += storage?.totalBytes ?? 0n
      acc.usedBytes += storage?.usedBytes ?? 0n
      acc.availableBytes += storage?.availableBytes ?? 0n
      return acc
    }, { totalBytes: 0n, usedBytes: 0n, availableBytes: 0n })

    return res.json({
      totalBytes: summary.totalBytes.toString(),
      usedBytes: summary.usedBytes.toString(),
      availableBytes: summary.availableBytes.toString(),
      accounts: accounts.map((account) => ({
        id: account.id,
        provider: account.provider,
        email: account.email,
        status: account.status,
        totalBytes: account.storageAccount?.totalBytes?.toString() ?? null,
        usedBytes: account.storageAccount?.usedBytes.toString() ?? '0',
        availableBytes: account.storageAccount?.availableBytes?.toString() ?? null,
        lastSyncedAt: account.storageAccount?.lastSyncedAt ?? null,
      })),
    })
  } catch (error) {
    return next(error)
  }
})

storageRouter.get('/routing-policy', async (req: AuthRequest, res, next) => {
  try {
    const policy = await getOrCreateRoutingPolicy(req.user!.id)
    return res.json({ policy: { id: policy.id, mode: policy.mode, priorityAccountIds: normalizePriorityAccountIds(policy.priorityAccountIds), roundRobinCursor: policy.roundRobinCursor } })
  } catch (error) {
    return next(error)
  }
})

storageRouter.patch('/routing-policy', async (req: AuthRequest, res, next) => {
  try {
    const body = routingPolicySchema.parse(req.body)
    const accountIds = [...new Set(body.priorityAccountIds ?? [])]
    const validAccounts = accountIds.length === 0 ? [] : await prisma.connectedAccount.findMany({ where: { id: { in: accountIds }, userId: req.user!.id, status: 'connected' }, select: { id: true } })
    const validIds = new Set(validAccounts.map((account) => account.id))
    const priorityAccountIds = accountIds.filter((id) => validIds.has(id))
    const policy = await prisma.uploadRoutingPolicy.upsert({
      where: { userId: req.user!.id },
      create: { userId: req.user!.id, mode: body.mode, priorityAccountIds, roundRobinCursor: 0 },
      update: { mode: body.mode, priorityAccountIds, ...(body.mode !== 'round_robin' ? { roundRobinCursor: 0 } : {}) },
    })
    return res.json({ policy: { id: policy.id, mode: policy.mode, priorityAccountIds: normalizePriorityAccountIds(policy.priorityAccountIds), roundRobinCursor: policy.roundRobinCursor } })
  } catch (error) {
    return next(error)
  }
})

storageRouter.get('/breakdown', async (req: AuthRequest, res, next) => {
  try {
    const activeFiles = await prisma.file.findMany({
      where: {
        userId: req.user!.id,
        status: 'active',
      },
      select: {
        mimeType: true,
        sizeBytes: true,
      },
    })

    const breakdown = { photo: 0n, video: 0n, document: 0n }
    for (const file of activeFiles) {
      if (file.mimeType.startsWith('image/')) {
        breakdown.photo += file.sizeBytes
      } else if (file.mimeType.startsWith('video/')) {
        breakdown.video += file.sizeBytes
      } else {
        breakdown.document += file.sizeBytes
      }
    }

    return res.json({
      photo: breakdown.photo.toString(),
      video: breakdown.video.toString(),
      document: breakdown.document.toString(),
    })
  } catch (error) {
    return next(error)
  }
})
