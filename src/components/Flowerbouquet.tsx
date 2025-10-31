import { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

const FlowerBouquet = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="flowers"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-20 px-4 relative overflow-hidden"
    >
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300/20 animate-float"
            size={24}
            fill="currentColor"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div 
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >

        {/* Title */}
        <h2 className="font-game text-2xl md:text-3xl text-rose-600 mb-4">
          For Yuri
        </h2>
        
        <p className="font-sans text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          A virtual bouquet to brighten your special day
        </p>

        {/* Flower Image */}
        <div 
          className={`relative mx-auto max-w-md md:max-w-lg transition-all duration-1500 delay-300 ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-rose-300/50 to-red-300/50 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"></div>
            
            {/* Flower image */}
            <img 
              src="/roses-bouquet.png" 
              alt="Bouquet of Roses"
              className="relative z-10 w-full h-auto drop-shadow-2xl animate-float-slow"
            />
          </div>
        </div>

        {/* Message */}
        <div 
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed mb-4">
            🌹 May your day be as beautiful as these roses 🌹
          </p>
          <p className="font-sans text-base text-muted-foreground">
            💖 And may all your dreams bloom into reality 💖
          </p>
        </div>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-2 mt-8 animate-pulse">
          <Heart className="text-rose-400 h-4 w-4" fill="currentColor" />
          <Heart className="text-pink-400 h-5 w-5" fill="currentColor" />
          <Heart className="text-red-400 h-4 w-4" fill="currentColor" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.6;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FlowerBouquet;