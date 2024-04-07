import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const flags = [
    {
      name: "Croatian",
      flag: "/hr.svg",
    },
    {
      name: "Italian",
      flag: "/it.svg",
    },
    {
      name: "Japanese",
      flag: "/jp.svg",
    },
    {
      name: "Spanish",
      flag: "/es.svg",
    },
    {
      name: "French",
      flag: "/fr.svg",
    },
  ];

  return (
    <footer className="w-full static bottom-0 border-t border-t-slate-200 h-14 flex items-center justify-center">
      <div className="flex items-center gap-3 ">
        {flags.map((flag) => {
          return (
            <Button
              variant={"ghost"}
              key={flag.name}
              className="flex items-center gap-3"
            >
              <Image src={flag.flag} alt={flag.name} width={40} height={40} />
              <h1 className="font-bold hidden lg:block">{flag.name}</h1>
            </Button>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
