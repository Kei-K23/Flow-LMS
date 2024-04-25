import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import Quiz from "../_components/quiz";

const LessonPage = async () => {
  const userProgressData = getUserProgress();
  const lessonsData = getLesson();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, lessons, userSubscription] = await Promise.all([
    userProgressData,
    lessonsData,
    userSubscriptionData,
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
        userSubscriptions={userSubscription}
      />
    </>
  );
};

export default LessonPage;
