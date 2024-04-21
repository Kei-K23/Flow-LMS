'use server';

import { db } from "@/db";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
            username: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg"
        })

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect('/learn');
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        username: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg"
    })

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect('/learn');
}

