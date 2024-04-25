"use client";

import { challengeOptions, challenges, userSubscriptions } from "@/db/schema";
import React, { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";
import {
  reduceHeart,
  upsertChallengeProgress,
} from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useAudio, useMount } from "react-use";
import FinishScreen from "./finish-screen";
import { useNoEnoughHeartsModal } from "@/store/use-not-enough-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type QuizProps = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHeart: number;
  userSubscriptions:
    | (typeof userSubscriptions.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

const Quiz = ({
  initialHeart,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscriptions,
}: QuizProps) => {
  const [correctAudio, _correct, correctControl] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _incorrect, incorrectControl] = useAudio({
    src: "incorrect.wav",
  });
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHeart);
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [lessonId] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((c) => !c.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "correct" | "incorrect">(
    "none"
  );
  const { open: OpenNoEnoughHeartsModal } = useNoEnoughHeartsModal();
  const { open: OpenPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      OpenPracticeModal();
    }
  });

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    return (
      <FinishScreen
        challenges={challenges}
        hearts={hearts}
        lessonId={lessonId}
      />
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "incorrect") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              OpenNoEnoughHeartsModal();
              return;
            }

            correctControl.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again!"));
      });
    } else {
      startTransition(() => {
        reduceHeart(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              OpenNoEnoughHeartsModal();
              return;
            }
            incorrectControl.play();
            setStatus("incorrect");
            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again!"));
      });
    }
  };

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
        lessonId={initialLessonId}
      />
    </>
  );
};

export default Quiz;
