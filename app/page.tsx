import { TopUtilityBar } from '@/components/top-utility-bar';
import { MainNav } from '@/components/main-nav';
import { Hero } from '@/components/hero';
import { WeatherStrip } from '@/components/weather-strip';
import { TrustBanner } from '@/components/trust-banner';
import { Services } from '@/components/services';
import { WhyUs } from '@/components/why-us';
import { ServiceArea } from '@/components/service-area';
import { Process } from '@/components/process';
import { GoogleReviews } from '@/components/google-reviews';
import { Pricing } from '@/components/pricing';
import { Faq } from '@/components/faq';
import { FinalCta } from '@/components/final-cta';
import { Footer } from '@/components/footer';

// Homepage. ISR via the inner fetch revalidate windows (24h reviews, 10m weather).
export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <TopUtilityBar />
      <MainNav />
      <main>
        <Hero />
        <WeatherStrip />
        <TrustBanner />
        <Services />
        <WhyUs />
        <ServiceArea />
        <Process />
        <GoogleReviews />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
