import { neon } from '@neondatabase/serverless'
import "dotenv/config"

// create a sql connection using the connection string from the .env file
export const sql = neon(process.env.DATABASE_URL)