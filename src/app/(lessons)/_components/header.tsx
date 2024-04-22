import { Progress } from "@/components/ui/progress";
import { useExistModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type HeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscriptions: boolean;
};

const Header = ({
  hearts,
  percentage,
  hasActiveSubscriptions,
}: HeaderProps) => {
  const { open } = useExistModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1150px] w-full mx-auto">
      <X
        onClick={open}
        className="text-neutral-500 hover:opacity-75 transition cursor-pointer w-8 h-8"
      />
      <Progress value={percentage} />

      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src={"/heart.svg"}
          alt="heart icon"
          height={28}
          width={28}
          className="mr-2"
        />
        {hasActiveSubscriptions ? <InfinityIcon /> : hearts}
      </div>
    </header>
  );
};

export default Header;
