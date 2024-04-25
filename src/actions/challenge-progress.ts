"use server";

import { db } from "@/db";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = auth()

    if (!userId) throw new Error("Unauthorized!")

    const currentUserProgress = await getUserProgress()
    const currentUserSubscription = await getUserSubscription()

    if (!currentUserProgress) throw new Error("User progress not found!")

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) throw new Error("Challenge not found!")

    const lessonId = challenge.lessonId;

    if (!lessonId) throw new Error("Lesson not found!")

    const existChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
    })

    const isPractice = !!existChallengeProgress;

    if (currentUserProgress.hearts === 0 && !isPractice && !currentUserSubscription?.isActive) {
        return { error: "hearts" }
    }

    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true
        }).where(eq(challengeProgress.id, existChallengeProgress.id))

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10
        }).where(eq(userProgress.userId, userId))

        revalidatePath("/learn");
        revalidatePath("/lessons");
        revalidatePath(`/lessons/${lessonId}`);
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lessons");
    revalidatePath(`/lessons/${lessonId}`);
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
};

export const reduceHeart = async (challengeId: number) => {
    const { userId } = auth()

    if (!userId) throw new Error("Unauthorized!")

    const currentUserProgress = await getUserProgress()

    const currentUserSubscription = await getUserSubscription()

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if (!challenge) throw new Error("Challenge not found!")

    const lessonId = challenge.lessonId;

    if (!lessonId) throw new Error("Lesson not found!")

    if (!currentUserProgress) throw new Error("User progress not found!")

    const existChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
    })

    const isPractice = !!existChallengeProgress;

    if (isPractice) {
        return { error: 'practice' }
    }

    if (currentUserSubscription?.isActive) {
        return { error: 'subscription' }
    }

    if (currentUserProgress.hearts === 0) {
        return { error: 'hearts' }
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0)
    }).where(eq(userProgress.userId, userId))

    revalidatePath("/learn");
    revalidatePath("/lessons");
    revalidatePath(`/lessons/${lessonId}`);
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
};