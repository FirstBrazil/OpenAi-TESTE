import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Journal from "@/components/Journal";
import Explorations from "@/components/Explorations";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className={isLoading ? "pointer-events-none" : ""}>
        <Hero />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Footer />
      </main>
    </div>
  );
}
