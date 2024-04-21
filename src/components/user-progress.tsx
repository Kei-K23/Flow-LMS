import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type UserProgressProps = {
  activeCourse: typeof courses.$inferInsert;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-x-2">
      <Link href={"/courses"}>
        <Button size={"sm"} variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      <Link href={"/shop"}>
        <Button size={"sm"} variant={"ghost"}>
          <Image src={"/points.svg"} alt="points" width={28} height={28} />
          {points}
        </Button>
      </Link>

      <Link href={"/shop"}>
        <Button size={"sm"} variant={"ghost"}>
          <Image
            src={"/heart.svg"}
            alt="heart"
            width={28}
            height={28}
            className="mr-1"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="w-4 h-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
