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

import { useExistModal } from "@/store/use-exit-modal";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

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
              src={"/heart.svg"}
              alt="modal image"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center mb-2">
            Practice lesson
          </DialogTitle>
          <DialogDescription className="text-center">
            Use practice lesson to regain hearts and points. You cannot loose
            hearts or points in practice lesson mode.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button variant={"blue-sky"} onClick={close}>
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeModal;
