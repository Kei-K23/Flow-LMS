import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


export const courses = pgTable("courses", {
    id: serial('id').primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("imageSrc"),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});