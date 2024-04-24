'use server';

import { db } from "@/db";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINT_TO_FILL = 10;

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = auth()
    const user = await currentUser()

    if (!user || !userId) throw new Error("Unauthorized")

    const course = await getCourseById(courseId);

    if (!course) throw new Error("Course not found")

    // if (!course.units.length || !course.units[0].lessons.length) throw new Error("Course is empty");
    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg"
        })

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect('/learn');
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg"
    })

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect('/learn');
}

export const refillHeart = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) throw new Error("User progress not found!")

    if (currentUserProgress.hearts === 5) throw new Error("Hearts are already full!")

    if (currentUserProgress.points < POINT_TO_FILL) throw new Error("No enough points to fill!")

    await db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - POINT_TO_FILL
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath('/learn')
    revalidatePath('/shop')
    revalidatePath('/leaderboard')
    revalidatePath('/quests')
}