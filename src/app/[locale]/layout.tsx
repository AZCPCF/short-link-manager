import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Vazirmatn } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { localeInfo, locales } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/server";
import { SITE_NAME } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import "../globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: false,
});

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return { title: SITE_NAME, description: t("description") };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  return (
    <html
      lang={locale}
      dir={localeInfo[locale].dir}
      className={`${vazirmatn.variable} /* your existing font + h-full antialiased classes */`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster dir={localeInfo[locale].dir} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
