"use client";

import { CenteredPage } from "@/components/kit/centered-page";
import { ErrorState } from "@/components/kit/error-state";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <CenteredPage>
      <ErrorState reset={reset} />
    </CenteredPage>
  );
}
