import { Heart, Gamepad2, Code, Sparkles, Trophy, Star, Cake, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  devMode: boolean;
  onToggleDevMode: () => void;
}

const Footer = ({ devMode = false, onToggleDevMode }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-r from-gamer-lavender via-gamer-pink to-gamer-sky py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Birthday Stats */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-2">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-game text-sm text-foreground">Birthday Stats</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>🎂 Level: 22</p>
              <p>⭐ Cuteness: MAX</p>
              <p>💖 Happiness: +100</p>
              <p>🎮 Gaming Skills: Legendary</p>
            </div>
          </div>

          {/* Achievements Unlocked */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-2">
              <Trophy className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-game text-sm text-foreground">Achievements</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>🏆 Survived Another Year</p>
              <p>✨ Best Player Award</p>
              <p>💝 Heart of Gold</p>
              <p>🎯 Main Character Energy</p>
            </div>
          </div>

          {/* Player Info */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-2">
              <Gamepad2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-game text-sm text-foreground">Player Info</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>🎮 Status: Online</p>
              <p>🌟 Role: Main Character</p>
              <p>💪 Power Level: 9999+</p>
              <p>🎯 Next Quest: More Adventures!</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-primary/20 mb-8"></div>

        {/* Special Message Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 animate-pulse" />
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 animate-pulse" />
          </div>
          <p className="font-game text-sm text-foreground mb-3">
            🎮 Special Birthday Quest Complete! 🎮
          </p>
          <p className="font-sans text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thank you for being an amazing co-op partner in this game called life! 
            Here's to more gaming sessions, late-night talks, and unforgettable memories together! 
            You make every level more fun! 💖
          </p>
        </div>

        {/* Bottom Credits Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Gift className="h-5 w-5 text-primary animate-bounce" />
            <Sparkles className="h-4 w-4 text-secondary" />
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
            <Sparkles className="h-4 w-4 text-accent" />
            <Gamepad2 className="h-5 w-5 text-primary" />
          </div>

          <p className="font-game text-xs text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            Made with
            <Heart 
              className="h-6 w-6 text-pink-500 fill-pink-500 cursor-pointer hover:scale-110 transition-transform animate-pulse" 
              onClick={onToggleDevMode}
              title={devMode ? "Dev Mode: ON (click to toggle)" : "Dev Mode: OFF (click to toggle)"}
            />
            by Your Player 2
            <Gamepad2 className="h-4 w-4 text-primary" />
          </p>

          <div className="pt-6 border-t-2 border-primary/20">
            <p className="font-sans text-xs text-muted-foreground mb-2">
              🎮 Best Wishes to my Yuri, Happy Grinding! 🎮
            </p>
            <p className="font-game text-xs text-muted-foreground/60">
              May your birthday be filled with legendary loot and epic wins! 🎁✨
            </p>
          </div>

          {/* Easter Egg Code */}
          <div className="mt-6 pt-4 border-t border-primary/10">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/40 font-mono">
              <Code className="h-3 w-3" />
              <span>v1.0.0 • Birthday Edition 2025</span>
              <Code className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;