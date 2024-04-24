import { cache } from "react";
import { db } from ".";
import { challengeProgress, challenges, courses, lessons, units, userProgress, userSubscriptions } from "./schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
    return await db.select().from(courses)
});

export const getCourseById = cache(async (id: number) => {
    return await db.query.courses.findFirst({
        where: eq(courses.id, id)
    })
});

export const getUnits = cache(async () => {
    const { userId } = auth()
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourse || !userProgress.activeCourseId || !userId) {
        return [];
    }

    // TODO: Need to check orderby for lessons
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            },
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map(lesson => {
            if (lesson.challenges.length === 0) {
                return { ...lesson, completed: false }
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
            })

            return { ...lesson, completed: allCompletedChallenges }
        })
        return { ...unit, lessons: lessonsWithCompletedStatus };
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

export const getCourseProgress = cache(async () => {
    const { userId } = auth();
    const userProgress = await getUserProgress()
    if (!userId || !userProgress?.activeCourseId) return null;

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })

    const firstUnCompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons)
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress || challenge.challengeProgress.length === 0 || challenge.challengeProgress.some((progress) => progress.completed === false)
            })
        })

    return {
        activeLesson: firstUnCompletedLesson,
        activeLessonId: firstUnCompletedLesson?.id
    }
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = auth();
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId || !userId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId)
                    }
                }
            }
        }
    })

    if (!data || !data.challenges) return null;

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed }
    })

    return { ...data, challenges: normalizedChallenges }
})

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) return 0;

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) return 0;

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);

    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);

    return percentage;
})

export const getUserSubscription = cache(async () => {
    const { userId } = auth();

    if (!userId) return null;

    const data = await db.query.userSubscriptions.findFirst({
        where: eq(userSubscriptions.userId, userId)
    })

    if (!data) return null;

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

    return {
        ...data,
        isActive: !!isActive
    }
});