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
import Image from "next/image";
import { Button } from "../ui/button";
import { useNoEnoughHeartsModal } from "@/store/not-enough-hearts-modal";

const NoEnoughHeartsModal = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useNoEnoughHeartsModal();

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
              src={"/mascot_bad.svg"}
              alt="modal image"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center mb-2">
            No enough hearts to continue playing!
          </DialogTitle>
          <DialogDescription className="text-center">
            Get Pro for unlimited hearts or exchanges your points to hearts.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"blue-sky"}
              onClick={() => {
                close();
                router.push("/shop");
              }}
            >
              Go to Shop
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                close();
              }}
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoEnoughHeartsModal;
