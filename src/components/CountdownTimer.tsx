import { useState, useEffect } from "react";
import { Cake, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CountdownTimerProps {
  isUnlocked: boolean;
}

const CountdownTimer = ({ isUnlocked }: CountdownTimerProps) => {
  // Dynamically calculate the next birthday (November 2nd)
  const getNextBirthday = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayThisYear = new Date(currentYear, 10, 2, 0, 0, 0); // Month is 0-indexed, so 10 = November

    // If birthday has passed this year, target next year's birthday
    if (now > birthdayThisYear) {
      return new Date(currentYear + 1, 10, 2, 0, 0, 0).getTime();
    }
    return birthdayThisYear.getTime();
  };

  const targetDate = getNextBirthday();
  const targetYear = new Date(targetDate).getFullYear();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setHasArrived(false);
      } else {
        // Birthday has arrived!
        setHasArrived(true);
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const scrollToMessage = () => {
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="countdown"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gamer-sky via-gamer-lavender to-gamer-mint py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="flex justify-center mb-8">
          <Cake className="text-primary animate-float" size={64} />
        </div>

        <h2 className="font-game text-2xl sm:text-3xl md:text-4xl mb-12 text-foreground leading-relaxed">
          {hasArrived
            ? "🎉 Birthday Level Unlocked! 🎉"
            : "Next Level Unlocks In..."}
        </h2>

        {!hasArrived ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-card/90 backdrop-blur-sm border-4 border-primary rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:scale-105 transition-transform"
              >
                <div className="font-game text-3xl sm:text-4xl md:text-5xl text-primary mb-2 animate-level-up">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="font-sans text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-2xl p-8 shadow-2xl mb-12 animate-pulse">
            <p className="font-game text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              🎂 THE DAY HAS ARRIVED! 🎂
            </p>
            <p className="font-sans text-lg text-white/90">
              Happy Birthday, Yuri! 💖
            </p>
          </div>
        )}

        <div className="bg-card/80 backdrop-blur-sm border-2 border-accent rounded-2xl p-6 shadow-[var(--shadow-soft)] max-w-md mx-auto mb-8">
          <p className="font-game text-xs text-accent-foreground mb-2">
            🎂 BIRTHDAY POWER-UP READY! 🎂
          </p>
          <p className="font-sans text-sm text-foreground">
            November 2nd, {targetYear}
          </p>
        </div>

        {!isUnlocked ? (
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 shadow-[var(--shadow-soft)] max-w-md mx-auto">
            <Lock className="text-muted-foreground mx-auto mb-3" size={32} />
            <p className="font-game text-xs text-muted-foreground mb-2">
              🔒 CONTENT LOCKED 🔒
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              Come back on November 2nd to unlock your special surprise! 💝
            </p>
          </div>
        ) : (
          <Button
            onClick={scrollToMessage}
            size="lg"
            className="font-game text-xs sm:text-sm px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl border-4 border-foreground/20 shadow-[var(--glow-lavender)] hover:shadow-[var(--glow-pink)] transition-all hover:scale-105"
          >
            CONTINUE ✨
          </Button>
        )}
      </div>
    </section>
  );
};

export default CountdownTimer;
