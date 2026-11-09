"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { createLinkAction } from "@/lib/actions/links";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function CreateLinkForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction, isPending] = useActionState(createLinkAction, null);
  const handleSubmit = useManualSubmit(formAction);

  useEffect(() => {
    if (!state) return;
    if (state.data) {
      toast.success("Link created.");
      onSuccess();
    } else if (!state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, onSuccess]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="destinationUrl"
        label="Destination URL"
        type="url"
        placeholder="https://example.com/a/very/long/url"
        error={state?.fieldErrors?.destinationUrl}
      />
      <FormField
        name="slug"
        label="Custom slug (optional)"
        placeholder="my-link"
        hint="Letters, numbers and dashes only."
        error={state?.fieldErrors?.slug}
      />
      <FormField
        name="title"
        label="Title (optional)"
        placeholder="My link"
        error={state?.fieldErrors?.title}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create link"}
      </Button>
    </form>
  );
}
