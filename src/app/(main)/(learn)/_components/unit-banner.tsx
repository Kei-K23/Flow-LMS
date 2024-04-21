import { Button } from "@/components/ui/button";
import { NotebookIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type UnitBannerProps = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="w-full bg-green-400 rounded-md p-4 text-white flex justify-between items-center">
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
        <p className="text-[17px] md:text-lg font-semibold">{description}</p>
      </div>
      <Link href={"/lessons"}>
        <Button
          variant={"secondary"}
          className="hidden xl:flex border-neutral-800 border-2 border-b-4 gap-2 p-3 py-5 active:border-b-2 hover:border-b-2"
        >
          <NotebookIcon />
          continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
