import FeedWrapper from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { Divide } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const quests = [
  {
    title: "Earn 20 xp",
    value: 20,
  },
  {
    title: "Earn 50 xp",
    value: 50,
  },
  {
    title: "Earn 100 xp",
    value: 100,
  },
  {
    title: "Earn 500 xp",
    value: 500,
  },
  {
    title: "Earn 1000 xp",
    value: 1000,
  },
];

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderBoardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderBoard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderBoardData,
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
          <div className="w-full">
            {quests.map((q) => {
              const progress = (userProgress.points / q.value) * 100;

              return (
                <div
                  className="flex items-center w-full gap-x-4 p-4 border-t-2"
                  key={q.title}
                >
                  <Image
                    src={"/points.svg"}
                    alt="points"
                    width={60}
                    height={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-base lg:text-lg font-bold">
                      {q.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
