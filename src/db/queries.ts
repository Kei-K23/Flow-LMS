import { cache } from "react";
import { db } from ".";
import { courses } from "./schema";

export const getCourses = cache(async () => {
    return await db.select().from(courses)
})