import { lessons, units } from "@/db/schema";
import React from "react";
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lesson: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
};

const Unit = ({
  id,
  order,
  title,
  description,
  lesson,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative mt-8">
        {lesson.map((l, index) => {
          const isCurrent = l.id === activeLesson?.id;
          const isLocked = !l.completed && !isCurrent;

          return (
            <LessonButton
              key={l.id}
              id={l.id}
              index={index}
              totalCount={lesson.length - 1}
              isCurrent={isCurrent}
              isLocked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
