import FeedWrapper from "@/components/feed-wrapper";
import Header from "@/components/header";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import Unit from "../_components/unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import Promo from "@/components/promo";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  const isPro = !!userSubscription?.isActive;

  if (
    !userProgress ||
    !userProgress.activeCourseId ||
    !userProgress.activeCourse
  ) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse?.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              title={unit.title}
              description={unit.description}
              order={unit.order}
              lesson={unit.lessons}
              activeLesson={
                courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                  unit: typeof unitsSchema.$inferSelect;
                }
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
