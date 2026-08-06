import { prisma } from '../config/prisma.js'
import { decryptText } from '../utils/crypto.js'

async function main() {
  const configs = await prisma.providerConfig.findMany()
  for (const config of configs) {
    console.log('ID:', config.id)
    console.log('Provider:', config.provider)
    console.log('Status:', config.status)
    try {
      console.log('ClientId:', decryptText(config.clientIdEncrypted))
      console.log('ClientSecret:', decryptText(config.clientSecretEncrypted))
    } catch (e: any) {
      console.log('Error decrypting:', e.message)
    }
  }
}

main().finally(() => prisma.$disconnect())
