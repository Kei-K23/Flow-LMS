"use client";
import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={"unlimited.svg"}
            alt="Unlimited hearts"
            height={26}
            width={26}
          />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts</p>
      </div>

      <Link
        href={"/shop"}
        className={cn(
          buttonVariants({ size: "lg", variant: "secondary" }),
          "w-full"
        )}
      >
        Upgrade today
      </Link>
    </div>
  );
};

export default Promo;
