import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToCountdown = () => {
    document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,hsl(var(--gamer-pink)),hsl(var(--gamer-lavender))_40%,hsl(var(--gamer-sky))_80%)]">
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/30 animate-float"
            size={Math.random() * 30 + 20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={`spark-${i}`}
            className="absolute text-accent/40 animate-pulse"
            size={Math.random() * 25 + 15}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8 animate-level-up">
          <h1 className="font-game text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground leading-relaxed drop-shadow-lg">
            LEVEL UP! 🎮
          </h1>
          <h2 className="font-game text-xl sm:text-2xl md:text-3xl text-primary-foreground leading-relaxed drop-shadow-md">
            +1 to Love, +1 to You
          </h2>
          <p className="font-game text-3xl sm:text-4xl md:text-5xl mt-4 text-foreground animate-glow-pulse">
            Rain! 💖
          </p>
        </div>

        <div className="mb-12 space-y-4">
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary rounded-2xl p-6 shadow-[var(--shadow-soft)] max-w-md mx-auto">
            <p className="font-sans text-sm text-muted-foreground mb-2">EXPERIENCE POINTS</p>
            <div className="h-6 bg-secondary rounded-full overflow-hidden border-2 border-foreground/20">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-pulse" style={{ width: '100%' }}></div>
            </div>
            <p className="font-game text-xs text-foreground mt-2">✨ LEVEL 22 ACHIEVED! ✨</p>
          </div>
        </div>

        <Button
          onClick={scrollToCountdown}
          size="lg"
          className="font-game text-xs sm:text-sm px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl border-4 border-foreground/20 shadow-[var(--glow-pink)] hover:shadow-[var(--glow-lavender)] transition-all hover:scale-105 animate-glow-pulse"
        >
          PRESS START ▶
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
