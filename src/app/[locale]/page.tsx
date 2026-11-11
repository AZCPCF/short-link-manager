import { Features } from "@/features/landing/components/features";
import { LandingFooter } from "@/features/landing/components/footer";
import { LandingHeader } from "@/features/landing/components/header";
import { Hero } from "@/features/landing/components/hero";
import { HowItWorks } from "@/features/landing/components/how-it-works";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <LandingFooter />
    </div>
  );
}
