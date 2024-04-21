import { cache } from "react";
import { db } from ".";
import { courses, userProgress } from "./schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getCourses = cache(async () => {
    return await db.select().from(courses)
});

export const getCourseById = cache(async (id: number) => {
    return await db.query.courses.findFirst({
        where: eq(courses.id, id)
    })
});


export const getUserProgress = cache(async () => {
    const { userId } = auth();

    if (!userId) return null;

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    return data;
});