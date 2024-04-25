import FeedWrapper from "@/components/feed-wrapper";
import Promo from "@/components/promo";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const LeaderBoardPage = async () => {
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
            src={"/leaderboard.svg"}
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderBoard?.map((userProgress, i) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700 mr-4">{i + 1}</p>
              <Avatar className="bg-green-500 h-12 w-12 ml-3 mr-5">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <div className="flex items-center gap-x-1">
                <Image
                  src={"/points.svg"}
                  alt="points"
                  height={25}
                  width={25}
                />
                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoardPage;
