"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useExistModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { Button } from "../ui/button";

const ExitModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExistModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/mascot_sad.svg"}
              alt="modal image"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center mb-2">
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button onClick={close}>Keep learning</Button>
            <Button onClick={() => router.push("/learn")}>Exit</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
