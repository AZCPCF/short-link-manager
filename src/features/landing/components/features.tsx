import {
  Activity,
  LayoutDashboard,
  Languages,
  Link2,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLandingT } from "@/features/landing/get-t";

const FEATURES = [
  { key: "create", icon: Link2 },
  { key: "track", icon: MousePointerClick },
  { key: "chart", icon: Activity },
  { key: "manage", icon: LayoutDashboard },
  { key: "secure", icon: ShieldCheck },
  { key: "comfort", icon: Languages },
] as const;

export async function Features() {
  const t = await getLandingT();

  return (
    <section
      id="features"
      className="mx-auto max-w-5xl scroll-mt-16 px-4 py-16"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("features.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("features.subtitle")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ key, icon: Icon }) => (
          <Card key={key}>
            <CardHeader>
              <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </div>
              <CardTitle>{t(`features.${key}.title`)}</CardTitle>
              <CardDescription>
                {t(`features.${key}.description`)}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
