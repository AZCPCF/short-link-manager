import { getLandingT } from "@/features/landing/get-t";

const STEPS = ["step1", "step2", "step3"] as const;

export async function HowItWorks() {
  const t = await getLandingT();

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-5xl scroll-mt-16 px-4 py-16"
    >
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
        {t("how.title")}
      </h2>
      <ol className="grid gap-8 sm:grid-cols-3">
        {STEPS.map((key, index) => (
          <li key={key} className="flex flex-col gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="font-semibold">{t(`how.${key}.title`)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(`how.${key}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
