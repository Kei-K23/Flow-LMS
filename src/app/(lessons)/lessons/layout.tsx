import ExitModal from "@/components/modal/exit-modal";
import NoEnoughHeartsModal from "@/components/modal/no-enough-hearts-modal";
import PracticeModal from "@/components/modal/practice-modal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Lessons",
};

const LessonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
        <ExitModal />
        <NoEnoughHeartsModal />
        <PracticeModal />
      </div>
    </div>
  );
};

export default LessonsLayout;
