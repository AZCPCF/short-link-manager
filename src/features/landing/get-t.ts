import { getTranslations } from "next-intl/server";

export function getLandingT() {
  return getTranslations("landing");
}
