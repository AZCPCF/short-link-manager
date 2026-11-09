export const VALIDATION_ERROR = "Please fix the highlighted fields.";

type IssueLike = { path: ReadonlyArray<PropertyKey>; message: string };

export function toFieldErrors<K extends string>(
  error: { issues: ReadonlyArray<IssueLike> },
  fields: readonly K[],
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};

  for (const issue of error.issues) {
    const field = fields.find((name) => name === issue.path[0]);
    if (field && !errors[field]) errors[field] = issue.message;
  }

  return errors;
}
