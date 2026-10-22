import { ApplyProvider } from "@/components/apply/Apply";
import { Curriculum } from "./_components/Curriculum";
import { Faq } from "./_components/Faq";
import { Footer, MobileBar } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { About, AiAdvantage, CareerMove } from "./_components/Intro";
import { Journey } from "./_components/Journey";
import { FinalCta, LikedMost, Pricing, SoftSkills } from "./_components/Offer";
import { Certification, Graduation, Internship, Overview, Projects } from "./_components/Program";
import { Hiring, LinkedIn, Recognition, Testimonials } from "./_components/Proof";
import { Tools } from "./_components/Tools";

/**
 * Online Full Stack — page order follows the EMC persuasion arc:
 * promise → conviction → what it is → the plan → proof → reward → offer → objections.
 */
export default function Page() {
  return (
    <ApplyProvider>
      <Header />
      <main>
        <Hero />
        <CareerMove />
        <About />
        <AiAdvantage />
        <Curriculum />
        <Tools />
        <Projects />
        <Overview />
        <Internship />
        <Journey />
        <Testimonials />
        <Hiring />
        <LinkedIn />
        <Recognition />
        <Certification />
        <Graduation />
        <Pricing />
        <SoftSkills />
        <Faq />
        <FinalCta />
        <LikedMost />
      </main>
      <Footer />
      <MobileBar />
    </ApplyProvider>
  );
}
