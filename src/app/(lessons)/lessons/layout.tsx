import ExitModal from "@/components/modal/exit-modal";
import React from "react";

const LessonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
        <ExitModal />
      </div>
    </div>
  );
};

export default LessonsLayout;
