import { Heart, Gamepad2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  devMode: boolean;
  onToggleDevMode: () => void;
}

const Footer = ({ devMode = false, onToggleDevMode }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-r from-gamer-lavender via-gamer-pink to-gamer-sky py-8 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Main Message */}
        <div className="space-y-2">
          <p className="font-sans text-sm text-muted-foreground">
            Thank you for being an amazing co-op partner! 🎮
          </p>
          <p className="font-sans text-xs text-muted-foreground/80">
            Here's to more adventures, late-night sessions, and unforgettable memories! 💖
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20"></div>

        {/* Credits */}
        <div className="space-y-3">
          <p className="font-game text-xs text-muted-foreground flex items-center justify-center gap-2">
            Made with
            <Heart 
              className="h-5 w-5 text-pink-500 fill-pink-500 cursor-pointer hover:scale-110 transition-transform animate-pulse" 
              onClick={onToggleDevMode}
              title={devMode ? "Dev Mode: ON" : "Dev Mode: OFF"}
            />
            by Your Player 2
          </p>

          <p className="font-sans text-xs text-muted-foreground">
            🎮 Best Wishes to my Yuri, Happy Grinding! 🎮
          </p>
        </div>

        {/* Version */}
        <div className="pt-4 border-t border-primary/10">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/40 font-mono">
            <Code className="h-3 w-3" />
            <span>v1.0.0 • Pirsu 2025</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;