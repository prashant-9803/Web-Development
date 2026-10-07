import LandingNavbar from "./components/landing/LandingNavbar";
import HeroSection from "./components/landing/HeroSection";
import BoardPreview from "./components/landing/BoardPreview";
import FeaturesSection from "./components/landing/FeaturesSection";
import WorkflowSection from "./components/landing/WorkflowSection";
import CallToAction from "./components/landing/CallToAction";
import LandingFooter from "./components/landing/LandingFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col selection:bg-zinc-900 selection:text-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <BoardPreview />
        <FeaturesSection />
        <WorkflowSection />
        <CallToAction />
      </main>
      <LandingFooter />
    </div>
  );
}
