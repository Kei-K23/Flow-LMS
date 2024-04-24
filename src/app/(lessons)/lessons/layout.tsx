import ExitModal from "@/components/modal/exit-modal";
import NoEnoughHeartsModal from "@/components/modal/no-enough-hearts-modal";
import React from "react";

const LessonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
        <ExitModal />
        <NoEnoughHeartsModal />
      </div>
    </div>
  );
};

export default LessonsLayout;
