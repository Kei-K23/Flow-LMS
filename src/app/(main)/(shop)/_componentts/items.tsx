"use client";

import { refillHeart } from "@/actions/user-progress";
import { createStripeURL } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useTransition } from "react";
import { toast } from "sonner";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const POINT_TO_FILL = 10;

const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHeart = () => {
    if (pending || hearts === 5 || points < POINT_TO_FILL) return;

    startTransition(() => {
      refillHeart().catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    if (pending) return;

    startTransition(() => {
      createStripeURL()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} alt="heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base font-bold">Refill hearts</p>
        </div>
        <Button
          onClick={onRefillHeart}
          disabled={pending || hearts === 5 || points < POINT_TO_FILL}
        >
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
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image
          src={"/unlimited.svg"}
          alt="unlimited heart"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base  font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
