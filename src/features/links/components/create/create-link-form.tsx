"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/kit/form-field";
import { Button } from "@/components/ui/button";
import { createLinkAction } from "@/features/links/actions";
import { useErrorToast } from "@/lib/form/use-error-toast";
import { useManualSubmit } from "@/lib/form/use-manual-submit";

export function CreateLinkForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("Links.create");
  const [state, formAction, isPending] = useActionState(createLinkAction, null);
  const handleSubmit = useManualSubmit(formAction);
  useErrorToast(state);

  useEffect(() => {
    if (state?.data) {
      toast.success(t("success"));
      onSuccess();
    }
  }, [state, onSuccess, t]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        name="destinationUrl"
        label={t("destinationUrl")}
        type="url"
        dir="ltr"
        placeholder={t("destinationPlaceholder")}
        error={state?.fieldErrors?.destinationUrl}
      />
      <FormField
        name="slug"
        label={t("slug")}
        dir="ltr"
        placeholder={t("slugPlaceholder")}
        hint={t("slugHint")}
        error={state?.fieldErrors?.slug}
      />
      <FormField
        name="title"
        label={t("titleLabel")}
        dir="auto"
        placeholder={t("titlePlaceholder")}
        error={state?.fieldErrors?.title}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
