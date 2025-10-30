import { Heart, Gamepad2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  devMode: boolean;
  onToggleDevMode: () => void;
}

const Footer = ({ devMode = false, onToggleDevMode }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-r from-gamer-lavender via-gamer-pink to-gamer-sky py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center items-center gap-3 mb-4"></div>

        <p className="font-game text-xs text-muted-foreground flex items-center justify-center">
          Made with
          <Heart 
            className="h-6 w-6 text-pink-500 fill-pink-500 mx-2.5 cursor-pointer hover:scale-110 transition-transform" 
            onClick={onToggleDevMode}
            title={devMode ? "Dev Mode: ON (click to toggle)" : "Dev Mode: OFF (click to toggle)"}
          />
          by Your Player 2
        </p>

        <div className="mt-6 pt-6 border-t-2 border-primary/20">
          <p className="font-sans text-xs text-muted-foreground mb-4">
            🎮 Best Wishes to my Yuri, Happy Grinding 🎮
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;