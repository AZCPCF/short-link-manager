import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";

import type { ErrorKey } from "@/lib/errors";

type FormErrorState = { error: ErrorKey | null; fieldErrors?: unknown } | null;

export function useErrorToast(state: FormErrorState) {
  const t = useTranslations("Errors");

  useEffect(() => {
    if (state?.error && !state.fieldErrors) toast.error(t(state.error));
  }, [state, t]);
}
