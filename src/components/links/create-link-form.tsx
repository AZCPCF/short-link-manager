"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useTransition,
  type FormEvent,
} from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLinkAction } from "@/lib/actions/links";

export function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(createLinkAction, null);
  const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;
    if (state.data) {
      toast.success("Link created.");
      formRef.current?.reset();
    } else if (!state.field) {
      toast.error(state.error);
    }
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  const errorFor = (field: "destinationUrl" | "slug" | "title") =>
    state?.error && state.field === field ? state.error : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="destinationUrl">Destination URL</Label>
        <Input
          id="destinationUrl"
          name="destinationUrl"
          type="url"
          placeholder="https://example.com/a/very/long/url"
          aria-invalid={errorFor("destinationUrl") !== null}
          required
        />
        {errorFor("destinationUrl") && (
          <p role="alert" className="text-sm text-destructive">
            {errorFor("destinationUrl")}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Custom slug (optional)</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="my-link"
            aria-invalid={errorFor("slug") !== null}
          />
          {errorFor("slug") && (
            <p role="alert" className="text-sm text-destructive">
              {errorFor("slug")}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title (optional)</Label>
          <Input
            id="title"
            name="title"
            placeholder="My link"
            aria-invalid={errorFor("title") !== null}
          />
          {errorFor("title") && (
            <p role="alert" className="text-sm text-destructive">
              {errorFor("title")}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Creating..." : "Create link"}
      </Button>
    </form>
  );
}
