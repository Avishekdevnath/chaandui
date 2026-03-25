import {
  Architecture,
  AccentGrid,
  ComponentShowcase,
  Comparison,
  FaqAndCta,
  FeatureBar,
  GetStarted,
  Hero,
  SocialProof,
  Testimonials
} from "./_sections";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <FeatureBar />
      <ComponentShowcase />
      <Architecture />
      <AccentGrid />
      <Comparison />
      <Testimonials />
      <GetStarted />
      <FaqAndCta />
    </main>
  );
}
