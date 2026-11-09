import { useTransition, type FormEvent } from "react";

export function useManualSubmit(formAction: (formData: FormData) => void) {
  const [, startTransition] = useTransition();

  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };
}
