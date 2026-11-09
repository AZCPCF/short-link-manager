"use client";

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

import { CreateLinkForm } from "@/features/links/components/create-link-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Plus />
        New link
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New short link</DialogTitle>
          <DialogDescription>
            Leave the slug empty to get a random 6-character one.
          </DialogDescription>
        </DialogHeader>
        <CreateLinkForm onSuccess={close} />
      </DialogContent>
    </Dialog>
  );
}
