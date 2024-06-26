import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv'
import * as schema from './schema'

dotenv.config();

const sql = neon(process.env.DB_CONNECTION!);
export const db = drizzle(sql, { schema });