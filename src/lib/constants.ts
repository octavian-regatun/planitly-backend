import dotenv from 'dotenv'
dotenv.config()

if (process.env.GOOGLE_CLIENT_ID === undefined) throw new Error('GOOGLE_CLIENT_ID is not defined')
if (process.env.GOOGLE_CLIENT_SECRET === undefined) throw new Error('GOOGLE_CLIENT_SECRET is not defined')
if (process.env.JWT_SECRET === undefined) throw new Error('JWT_SECRET is not defined')

export const PORT = process.env.PORT ?? 3001
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const JWT_SECRET = process.env.JWT_SECRET
