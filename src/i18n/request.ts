import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import type { AppLocale } from "./locales";
import type { Messages } from "./messages/en";
import { routing } from "./routing";

const loaders: Record<AppLocale, () => Promise<{ default: Messages }>> = {
  en: () => import("./messages/en"),
  fa: () => import("./messages/fa"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const { default: messages } = await loaders[locale]();

  return { locale, messages, timeZone: "UTC" };
});
