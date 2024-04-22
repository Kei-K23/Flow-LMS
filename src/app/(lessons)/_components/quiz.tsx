"use client";

import { challengeOptions, challenges } from "@/db/schema";
import React, { useState } from "react";
import Header from "./header";

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

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscriptions={!!userSubscriptions?.isActive}
      />
    </>
  );
};

export default Quiz;
