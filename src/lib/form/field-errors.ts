import { isErrorKey, type ErrorKey } from "@/lib/errors";

type IssueLike = { path: ReadonlyArray<PropertyKey>; message: string };

export function toFieldErrors<K extends string>(
  error: { issues: ReadonlyArray<IssueLike> },
  fields: readonly K[],
): Partial<Record<K, ErrorKey>> {
  const errors: Partial<Record<K, ErrorKey>> = {};

  for (const issue of error.issues) {
    const field = fields.find((name) => name === issue.path[0]);
    if (field && !errors[field]) {
      errors[field] = isErrorKey(issue.message) ? issue.message : "validation";
    }
  }

  return errors;
}
