import { Config } from "drizzle-kit"
import * as dotenv from 'dotenv'
dotenv.config();

export default {
    schema: "./src/db/schema.ts",
    out: "/drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DB_CONNECTION!,
    },
} satisfies Config;
