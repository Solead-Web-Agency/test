import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Volume2, VolumeX } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import Confetti from "@/components/Confetti";
import { SECRET_WORD, FINAL_MESSAGE, FINAL_MESSAGE_2 } from "@/data/riddles";
import { useAudio } from "@/contexts/AudioContext";

const RevealPage = () => {
  const navigate = useNavigate();
  const { isPlaying, toggleAudio } = useAudio();
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>(
    Array(SECRET_WORD.length).fill(false)
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Reveal letters one by one
    SECRET_WORD.split("").forEach((_, index) => {
      setTimeout(() => {
        setRevealedLetters((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, 500 + index * 400);
    });

    // Show confetti after all letters
    setTimeout(() => {
      setShowConfetti(true);
    }, 500 + SECRET_WORD.length * 400);

    // Show message
    setTimeout(() => {
      setShowMessage(true);
    }, 1000 + SECRET_WORD.length * 400);
  }, []);

  const handleRestart = () => {
    localStorage.removeItem("foundLetters");
    localStorage.removeItem("solvedRiddles");
    navigate("/");
  };

  return (
    <div className="min-h-screen christmas-bg relative overflow-hidden">
      <Snowfall />
      {showConfetti && <Confetti />}
      
      {/* Audio control button */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
        aria-label={isPlaying ? "Couper le son" : "Activer le son"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-foreground" />
        ) : (
          <VolumeX className="w-5 h-5 text-foreground" />
        )}
      </button>
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-12">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-christmas text-primary">
            🎄 Félicitations ! 🎄
          </h1>
          
          {/* Revealed word */}
          <div className="flex justify-center gap-2 sm:gap-4">
            {SECRET_WORD.split("").map((letter, index) => (
              <div
                key={index}
                className={`w-12 h-16 sm:w-16 sm:h-20 rounded-xl flex items-center justify-center text-3xl sm:text-5xl font-christmas font-bold transition-all duration-500 ${
                  revealedLetters[index]
                    ? "bg-primary text-primary-foreground golden-glow animate-reveal-letter"
                    : "bg-card border-2 border-border"
                }`}
                style={{
                  animationDelay: revealedLetters[index] ? `${index * 0.1}s` : "0s",
                }}
              >
                {revealedLetters[index] ? letter : ""}
              </div>
            ))}
          </div>
          
          {/* Final message */}
          {showMessage && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border-2 border-accent golden-glow max-w-2xl mx-auto">
                    <p className="text-2xl sm:text-3xl font-christmas text-foreground leading-relaxed">
                    {FINAL_MESSAGE}
                    </p><br />
                    <p className="text-2xl sm:text-3xl font-christmas text-foreground leading-relaxed">
                    {FINAL_MESSAGE_2}
                    </p>
                <div className="mt-6 flex justify-center">
                  <img 
                    src="/casino-de-cabourg-cote.jpg" 
                    alt="Vue de Cabourg" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
                <Button
                  onClick={handleRestart}
                  variant="secondary"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Recommencer le jeu
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevealPage;
