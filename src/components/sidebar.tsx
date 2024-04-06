import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SidebarItem from "./sidebar-item";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader, LogInIcon } from "lucide-react";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "lg:w-[256px] h-full  lg:fixed top-0 left-0 border-r-2 px-5 flex flex-col pt-8",
        className
      )}
    >
      <Link href={"/learn"} className="flex items-center gap-3 pl-4">
        <Image src={"/mascot.svg"} alt="icon" width={40} height={40} />
        <h1 className="font-bold text-emerald-600">Flow</h1>
      </Link>

      <div className="flex flex-1 flex-col gap-1 mt-5">
        <SidebarItem label="LEARN" href="/learn" icon="/learn.svg" />
        <SidebarItem
          label="LEADER BOARD"
          href="/leaderboard"
          icon="/leaderboard.svg"
        />
        <SidebarItem label="QUESTS" href="/quests" icon="/quests.svg" />
        <SidebarItem label="SHOP" href="/shop" icon="/shop.svg" />
      </div>

      <div className="pl-4 pb-4">
        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </aside>
  );
};

export default Sidebar;
