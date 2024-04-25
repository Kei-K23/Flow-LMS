"use client";

import React from "react";
import Link from "next/link";
import Quests from "./quests";

type QuestsIndicatorProps = {
  points: number;
};

const QuestsIndicator = ({ points }: QuestsIndicatorProps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base">Quests</h3>
        <Link
          href={"/quests"}
          className="text-green-500 hover:text-green-500/80"
        >
          View all
        </Link>
      </div>
      <Quests points={points} />
    </div>
  );
};

export default QuestsIndicator;
