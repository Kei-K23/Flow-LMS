import { getCourses, getUserProgress } from "@/db/queries";
import React from "react";
import List from "../_components/list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
};

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[950px] px-4 mx-auto py-4">
      <h1 className="text-xl font-bold text-gray-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId!} />
    </div>
  );
};

export default CoursesPage;
