import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import ConversationDemo from "./components/ConversationDemo";
import IntegrationsSection from "./components/IntegrationsSection";
import StickyStorySection from "./components/StickyStorySection";
import WorkflowShowcase from "./components/WorkflowShowcase";
import TestimonialQuote from "./components/TestimonialQuote";
import IndustryShowcase from "./components/IndustryShowcase";
import LanguagesShowcase from "./components/LanguagesShowcase";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <Navbar />
      <div className="flex flex-col flex-1">
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <ConversationDemo />
          <IntegrationsSection />
          <StickyStorySection />
          <WorkflowShowcase />
          <TestimonialQuote />
          <IndustryShowcase />
          <LanguagesShowcase />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
