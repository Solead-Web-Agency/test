import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import ProgressLetters from "@/components/ProgressLetters";
import RiddleCard from "@/components/RiddleCard";
import { riddles, SECRET_WORD } from "@/data/riddles";
import { useAudio } from "@/contexts/AudioContext";

const RiddlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const riddleId = parseInt(id || "1");
  const { isPlaying, toggleAudio } = useAudio();
  
  const [foundLetters, setFoundLetters] = useState<string[]>(() => {
    const saved = localStorage.getItem("foundLetters");
    return saved ? JSON.parse(saved) : Array(SECRET_WORD.length).fill("");
  });
  
  const [solvedRiddles, setSolvedRiddles] = useState<number[]>(() => {
    const saved = localStorage.getItem("solvedRiddles");
    return saved ? JSON.parse(saved) : [];
  });

  const currentRiddle = riddles.find((r) => r.id === riddleId);
  const isAlreadySolved = solvedRiddles.includes(riddleId);

  useEffect(() => {
    localStorage.setItem("foundLetters", JSON.stringify(foundLetters));
    localStorage.setItem("solvedRiddles", JSON.stringify(solvedRiddles));
  }, [foundLetters, solvedRiddles]);

  useEffect(() => {
    if (foundLetters.every((l) => l !== "")) {
      navigate("/reveal");
    }
  }, [foundLetters, navigate]);

  if (!currentRiddle) {
    navigate("/");
    return null;
  }

  const handleSolved = (letter: string) => {
    const letterIndex = SECRET_WORD.indexOf(letter);
    if (letterIndex !== -1) {
      const newFoundLetters = [...foundLetters];
      newFoundLetters[letterIndex] = letter;
      setFoundLetters(newFoundLetters);
    }
    
    setSolvedRiddles((prev) => [...prev, riddleId]);
    
    setTimeout(() => {
      if (riddleId < riddles.length) {
        navigate(`/riddle/${riddleId + 1}`);
      } else {
        navigate("/reveal");
      }
    }, 2000);
  };

  const goToNext = () => {
    if (riddleId < riddles.length) {
      navigate(`/riddle/${riddleId + 1}`);
    } else {
      navigate("/reveal");
    }
  };

  const goToPrevious = () => {
    if (riddleId > 1) {
      navigate(`/riddle/${riddleId - 1}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen christmas-bg relative overflow-hidden">
      <Snowfall />
      
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
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={goToPrevious} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          
          {isAlreadySolved && riddleId < riddles.length && (
            <Button variant="ghost" onClick={goToNext} className="gap-2">
              Suivant
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Progress */}
        <ProgressLetters foundLetters={foundLetters} totalLetters={SECRET_WORD.length} />
        
        {/* Riddle */}
        {isAlreadySolved ? (
          <div className="max-w-lg mx-auto text-center space-y-6 card-christmas p-8 rounded-2xl">
            <p className="text-xl font-christmas text-secondary">
              ✅ Énigme déjà résolue !
            </p>
            <p className="text-muted-foreground">
              La lettre "{currentRiddle.letter}" a été trouvée.
            </p>
            <Button onClick={goToNext} className="mt-4">
              {riddleId < riddles.length ? "Énigme suivante" : "Voir la révélation"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <RiddleCard
            riddleNumber={riddleId}
            totalRiddles={riddles.length}
            question={currentRiddle.question}
            hint={currentRiddle.hint}
            correctAnswer={currentRiddle.answer}
            letterToReveal={currentRiddle.letter}
            onSolved={handleSolved}
          />
        )}
      </div>
    </div>
  );
};

export default RiddlePage;
