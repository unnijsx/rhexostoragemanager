import { prisma } from '../config/prisma.js'
import { createOAuthClient } from '../modules/google/google.service.js'
import { randomToken, hashToken } from '../utils/crypto.js'

async function main() {
  try {
    const config = await prisma.providerConfig.findFirstOrThrow({
      where: { userId: null, provider: 'google_drive', status: 'active' },
      orderBy: { createdAt: 'desc' }
    })
    console.log('Found config:', config.id)
    
    const state = randomToken()
    console.log('Generated state:', state)
    
    const oauthState = await prisma.oauthState.create({
      data: {
        userId: 'some-user-id-to-test', // Dummy user ID just to test DB insert
        providerConfigId: config.id,
        flow: 'connect',
        stateHash: hashToken(state),
        expiresAt: new Date(Date.now() + 10 * 60_000)
      }
    })
    console.log('Created oauthState:', oauthState.id)
    
    const client = createOAuthClient(config)
    const url = client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: true,
      scope: config.scopes as string[],
      state,
    })
    console.log('Generated URL:', url)
  } catch (err: any) {
    console.error('ERROR OCCURRED:', err)
  }
}

main().finally(() => prisma.$disconnect())
