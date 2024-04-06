import { cn } from "@/lib/utils";
import React from "react";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "lg:w-[256px] h-full bg-blue-400 lg:fixed top-0 left-0 border-r-2 px-4 flex flex-col",
        className
      )}
    >
      Sidebar
    </aside>
  );
};

export default Sidebar;
