"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  isCurrent: boolean;
  isLocked: boolean;
  percentage: number;
};

const LessonButton = ({
  id,
  index,
  totalCount,
  isCurrent,
  isLocked,
  percentage,
}: LessonButtonProps) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }
  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !isCurrent && !isLocked;
  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lessons/${id}` : "/lessons";

  return (
    <Link
      href={href}
      aria-disabled={isLocked}
      className={cn(isLocked ? "pointer-events-none" : "pointer-events-auto")}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCurrent ? 60 : 20,
        }}
      >
        {isCurrent ? (
          <div className="w-[102px] h-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#4ade80",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
            >
              <Button
                size="rounded"
                className="border-b-4 border-green-600 active:border-b-2"
                variant={isLocked ? "locked" : "secondary"}
              >
                <Icon
                  className={cn(
                    "h-10 w-10",
                    isLocked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button size="rounded" variant={isLocked ? "locked" : "secondary"}>
            <Icon
              className={cn(
                "h-10 w-10",
                isLocked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};

export default LessonButton;
