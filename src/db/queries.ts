import { cache } from "react";
import { db } from ".";
import { courses, units, userProgress } from "./schema";
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

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourse || !userProgress.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: true,
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonWithCompletedStatus = unit.lessons.map(lesson => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
            })

            return { ...lesson, completed: allCompletedChallenges }
        })
        return { ...unit, lessons: lessonWithCompletedStatus };
    })

    return normalizedData;
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