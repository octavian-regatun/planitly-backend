import { User } from '@prisma/client'
import { TokenPayload } from 'google-auth-library'
import { customAlphabet } from 'nanoid'
import db from './prisma'

function generateUsername (): string {
  const nanoid = customAlphabet('1234567890abcdef', 8)

  const username = nanoid()

  return username
}

export async function saveUser (payload: TokenPayload): Promise<User> {
  if (payload.email === undefined) { throw new Error('Payload email is undefined') }
  if (payload.given_name === undefined) { throw new Error('Payload given_name is undefined') }
  if (payload.family_name === undefined) { throw new Error('Payload family_name is undefined') }

  const user = await db.user.create({
    data: {
      id: payload.sub,
      username: generateUsername(),
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      gender: 'unknown',
      role: 'basic',
      authProvider: 'google'
    }
  })

  return user
}

export async function isUserInDatabase (id: string): Promise<boolean> {
  const user = await db.user.findUnique({ where: { id } })

  if (user === null) return false

  return true
}
