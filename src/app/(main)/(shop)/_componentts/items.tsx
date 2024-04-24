"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const POINT_TO_FILL = 10;

const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} alt="heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button disabled={hearts === 5 || points < POINT_TO_FILL}>
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src={"/points.svg"} alt="points" height={20} width={20} />
              <p>{POINT_TO_FILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
