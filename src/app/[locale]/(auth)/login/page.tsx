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
import { LoginForm } from "@/features/auth/components/login-form";
import { Link } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/server";

export default async function LoginPage({
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
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            {t("login.noAccount")}{" "}
            <Link href="/signup" className="underline">
              {t("login.signUpLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </CenteredPage>
  );
}
