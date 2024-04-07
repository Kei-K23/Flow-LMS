"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  label: string;
  href: string;
  icon: string;
};

const SidebarItem = ({ label, href, icon }: SidebarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "active" : "ghost",
          className:
            "py-[23px] flex justify-start items-center rounded-xl w-full",
        })
      )}
    >
      <Image src={icon} alt={label} width={35} height={35} className="mr-4" />
      <p>{label}</p>
    </Link>
  );
};

export default SidebarItem;
