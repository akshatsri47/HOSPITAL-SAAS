import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogoStrip from "./components/LogoStrip";
import AIDemoSection from "./components/AIDemoSection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import ImpactSection from "./components/ImpactSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col flex-1 pt-[60px] lg:pt-[92px]">
        <main className="flex-1">
          <HeroSection />
          <LogoStrip />
          <AIDemoSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <FeaturesSection />
          <ImpactSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
