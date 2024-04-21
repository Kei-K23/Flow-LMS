import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


export const courses = pgTable("courses", {
    id: serial('id').primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("imageSrc"),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const courseRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress)
}))

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    username: text("username").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer('hearts').notNull().default(5),
    points: integer('points').notNull().default(0)
})

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}))
