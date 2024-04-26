import FeedWrapper from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Quests from "@/components/quests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quests",
};

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  const isProMember = !!userSubscription?.isActive;
  if (!userProgress || !userProgress.activeCourse) return redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hasActiveSubscription={isProMember}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        {!isProMember && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/quests.svg"}
            alt="quests"
            height={90}
            width={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete the quests by earning points
          </p>
          <Quests points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
