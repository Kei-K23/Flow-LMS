import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader, LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex-1 h-full max-w-[980px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
      <div className="relative w-[240px] h-[240px] lg:w-[420px] lg:h-[420px]">
        <Image src={"/hero.svg"} alt="hero image" fill />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-5">
        <p className="text-xl lg:text-2xl text-center">
          Learn, Practice and master new Language with{" "}
          <span className="font-bold text-emerald-500">Flow</span> 🚀.
        </p>
        <ClerkLoading>
          <Button variant={"primary"}>
            <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
          </Button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Link
              href={"/learn"}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "text-base lg:text-lg"
              )}
            >
              Continue Learning
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button variant={"primary"} className="text-base lg:text-lg">
                <LogInIcon className="w-5 h-5 mr-2" /> Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default LandingPage;
