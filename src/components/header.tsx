import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 pt-2 lg:pt-[28px] bg-white lg:z-50 text-neutral-400 flex items-center justify-between border-b-2">
      <Link href={"/courses"}>
        <Button size={"sm"} variant={"ghost"}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  );
};

export default Header;
