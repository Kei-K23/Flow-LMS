import { getCourses } from "@/db/queries";
import React from "react";
import List from "../_components/list";

const CoursesPage = async () => {
  const courses = await getCourses();
  return (
    <div className="h-full max-w-[950px] px-4 mx-auto py-4">
      <h1 className="text-xl font-bold text-gray-700">Language Courses</h1>
      <List courses={courses} activeCourseId={1} />
    </div>
  );
};

export default CoursesPage;
