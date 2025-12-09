import { useState, useEffect } from "react";
import { Sparkles, Heart } from "lucide-react";

const FlowerBouquet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFlowerClick = () => {
    // Launch Riot Client
    window.location.href = 'riotclient://';

    console.log("Launching Riot Client...");

    // Show modal after a short delay
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

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
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Claim your Flower label */}
          <div className="mb-6">
            <p className="font-game text-xl md:text-2xl text-rose-500 animate-pulse flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              Claim your Flower
              <Sparkles className="h-5 w-5" />
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Click the bouquet below
            </p>
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={handleFlowerClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleFlowerClick()}
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-rose-300/50 to-red-300/50 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"></div>

            {/* Flower image */}
            <img
              src="/happy-birthday-rain/roses-bouquet.png"
              alt="Bouquet of Roses"
              className="relative z-10 w-full h-auto drop-shadow-2xl animate-float-slow group-hover:scale-105 transition-transform duration-500"
            />

            {/* Click indicator overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <p className="font-game text-rose-600 text-lg">
                  Click to Claim!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-rose-100 rounded-full p-4">
                  <Heart className="h-12 w-12 text-rose-500" fill="currentColor" />
                </div>
              </div>

              <h3 className="font-game text-2xl text-rose-600 mb-4">
                Riot Client Launched! 🌹
              </h3>

              <p className="font-sans text-base text-gray-700 mb-6 leading-relaxed">
                Please proceed to <span className="font-semibold text-rose-600">Valorant</span> once you've logged in to the Riot Client.
              </p>

              <p className="font-sans text-sm text-gray-500 mb-6">
                💖 Enjoy your game! 💖
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-game py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.6;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FlowerBouquet;
