import { User } from '@prisma/client'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { GOOGLE_CLIENT_ID, JWT_SECRET } from './constants'

export async function getPayload (tokenId: string): Promise<TokenPayload> {
  const oauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID)

  const token = await oauth2Client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_CLIENT_ID
  })

  const payload = token.getPayload()

  if (payload === undefined) throw new Error('Can\'t get payload')

  return payload
}

export function createJwt (user: User): string {
  return jwt.sign({
    id: user.id
  }, JWT_SECRET, { expiresIn: '1d' }
  )
}
