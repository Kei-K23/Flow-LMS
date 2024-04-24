import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import Quiz from "../../_components/quiz";

type LessonIdPageProps = {
  params: {
    lessonId: string;
  };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  if (!params?.lessonId) {
    redirect("/learn");
  }

  const userProgressData = getUserProgress();
  const lessonsData = getLesson(+params.lessonId);

  const [userProgress, lessons] = await Promise.all([
    userProgressData,
    lessonsData,
  ]);

  if (!lessons || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lessons.challenges.filter((challenge) => challenge.completed).length /
      lessons.challenges.length) *
    100;

  return (
    <>
      <Quiz
        initialPercentage={initialPercentage}
        initialLessonId={lessons.id}
        initialLessonChallenges={lessons.challenges}
        initialHeart={userProgress.hearts}
        userSubscriptions={null}
      />
    </>
  );
};

export default LessonIdPage;
