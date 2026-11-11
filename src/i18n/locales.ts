export const locales = ["en", "fa"] as const;

export type AppLocale = (typeof locales)[number];

export const localeInfo: Record<
  AppLocale,
  { label: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", dir: "ltr" },
  fa: { label: "فارسی", dir: "rtl" },
};
