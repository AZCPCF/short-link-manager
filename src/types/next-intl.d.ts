import type { AppLocale } from "@/i18n/locales";
import type { Messages } from "@/i18n/messages/en";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: Messages;
  }
}
