import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv'
import * as schema from './schema'

dotenv.config();

const sql = neon(process.env.DB_CONNECTION!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Database reset started");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        console.log("Database reset finished");
    } catch (e) {
        console.error(e);
        throw new Error("Failed to seed to the database");
    }
}

main()