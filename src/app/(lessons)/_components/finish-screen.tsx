import { challengeOptions, challenges } from "@/db/schema";
import Image from "next/image";
import React from "react";
import ResultCard from "./result-card";

type FinishScreenProps = {
  challenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  hearts: number;
};

const FinishScreen = ({ challenges, hearts }: FinishScreenProps) => {
  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
      <Image
        src={"/finish.svg"}
        alt="finish svg"
        className="hidden lg:block"
        height={100}
        width={100}
      />
      <Image
        src={"/finish.svg"}
        alt="finish svg"
        className="block lg:hidden"
        height={50}
        width={50}
      />
      <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
        Great job! <br /> You&apos;ve completed the lesson.
      </h1>
      <div className="flex items-center gap-x-4 w-full">
        <ResultCard variant="points" values={challenges.length * 10} />
        <ResultCard variant="hearts" values={hearts} />
      </div>
    </div>
  );
};

export default FinishScreen;