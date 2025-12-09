import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import MessageSection from "@/components/MessageSection";
import FlowerBouquet from "@/components/FlowerBouquet";
import Footer from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import config from "../../config.json";

const Index = () => {
  const targetDate = new Date("2025-11-02T00:00:00").getTime();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [devMode, setDevMode] = useState(() => {
    return localStorage.getItem("devMode") === "true";
  });

  useEffect(() => {
    const checkDate = () => {
      const now = new Date().getTime();
      setIsUnlocked(now >= targetDate || devMode);
    };
    
    checkDate();
    const interval = setInterval(checkDate, 1000);
    return () => clearInterval(interval);
  }, [targetDate, devMode]);

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    localStorage.setItem("devMode", String(newDevMode));
  };

  return (
    <main className="overflow-x-hidden">
      {isUnlocked ? (
        <>
          <HeroSection />
          <CountdownTimer isUnlocked={isUnlocked} />
          {config.features.showMessageSection && <MessageSection />}
          <FlowerBouquet />
        </>
      ) : (
        <CountdownTimer isUnlocked={isUnlocked} />
      )}
      <Footer devMode={devMode} onToggleDevMode={toggleDevMode} />
      <MusicPlayer />
    </main>
  );
};

export default Index;
