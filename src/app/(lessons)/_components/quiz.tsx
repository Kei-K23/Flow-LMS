"use client";

import { challengeOptions, challenges } from "@/db/schema";
import React, { useState } from "react";
import Header from "./header";
import QuestionBubble from "./question-bubble";

type QuizProps = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHeart: number;
  userSubscriptions: any; // TODO actual type of subscription
};

const Quiz = ({
  initialHeart,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscriptions,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHeart);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((c) => !c.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const challenge = challenges[activeIndex];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscriptions={!!userSubscriptions?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
