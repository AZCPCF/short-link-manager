import { getTranslations } from "next-intl/server";

import { CenteredPage } from "@/components/kit/centered-page";
import { Logo } from "@/components/kit/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/signup-form";
import { Link } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/server";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Auth" });

  return (
    <CenteredPage>
      <Logo />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("signup.title")}</CardTitle>
          <CardDescription>{t("signup.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignUpForm />
          <p className="text-center text-sm text-muted-foreground">
            {t("signup.haveAccount")}{" "}
            <Link href="/login" className="underline">
              {t("signup.loginLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </CenteredPage>
  );
}
