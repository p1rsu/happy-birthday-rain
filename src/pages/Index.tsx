import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import MessageSection from "@/components/MessageSection";
import Footer from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";

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
          <MessageSection />
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
