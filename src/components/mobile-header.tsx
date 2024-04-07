import React from "react";
import MobileSidebar from "./mobile-sidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-14 flex items-center bg-green-400 sticky top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
