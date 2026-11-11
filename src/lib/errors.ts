export const ERROR_KEYS = [
  "generic",
  "validation",
  "invalidCredentials",
  "signUpFailed",
  "invalidLink",
  "slugGenerationFailed",
  "slugTaken",
  "nameRequired",
  "emailInvalid",
  "passwordTooShort",
  "passwordRequired",
  "urlInvalid",
  "slugTooLong",
  "slugInvalid",
  "titleTooLong",
] as const;

export type ErrorKey = (typeof ERROR_KEYS)[number];

export function isErrorKey(value: string): value is ErrorKey {
  return (ERROR_KEYS as readonly string[]).includes(value);
}

export const errorKey = (key: ErrorKey): string => key;
