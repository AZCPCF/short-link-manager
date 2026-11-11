"use client";

import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ErrorKey } from "@/lib/errors";

type FormFieldProps = ComponentProps<typeof Input> & {
  name: string;
  label: string;
  error?: ErrorKey;
  hint?: string;
};

export function FormField({
  name,
  label,
  error,
  hint,
  ...inputProps
}: FormFieldProps) {
  const t = useTranslations("Errors");
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {t(error)}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
