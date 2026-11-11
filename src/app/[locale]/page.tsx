import { redirect } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  redirect({ href: "/dashboard", locale });
}
