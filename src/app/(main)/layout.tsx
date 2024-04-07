import MobileHeader from "@/components/mobile-header";
import Sidebar from "@/components/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full">
        <div className="max-w-[1050px] mx-auto h-full ">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
