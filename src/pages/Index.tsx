import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveStatusSection from "@/components/LiveStatusSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TechSection from "@/components/TechSection";
import DemoSection from "@/components/DemoSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import FutureSection from "@/components/FutureSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveStatusSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TechSection />
      <DemoSection />
      <ApplicationsSection />
      <FutureSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
