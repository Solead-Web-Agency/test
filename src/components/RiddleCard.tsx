import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Sparkles, Lightbulb } from "lucide-react";

interface RiddleCardProps {
  riddleNumber: number;
  totalRiddles: number;
  question: string;
  hint?: string;
  correctAnswer: string;
  letterToReveal: string;
  onSolved: (letter: string) => void;
}

// Fonction pour supprimer les accents d'une chaîne
const removeAccents = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const RiddleCard = ({
  riddleNumber,
  totalRiddles,
  question,
  hint,
  correctAnswer,
  letterToReveal,
  onSolved,
}: RiddleCardProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedAnswer = removeAccents(answer.toLowerCase().trim());
    const normalizedCorrect = removeAccents(correctAnswer.toLowerCase().trim());
    
    if (normalizedAnswer === normalizedCorrect) {
      setSolved(true);
      setError(false);
      setTimeout(() => {
        onSolved(letterToReveal);
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <Card className="card-christmas max-w-lg mx-auto animate-float">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Gift className="w-8 h-8 text-primary" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Énigme {riddleNumber} sur {totalRiddles}
        </p>
        <CardTitle className="text-2xl sm:text-3xl font-christmas text-primary">
          🎄 Trouvez la réponse ! 🎄
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-lg sm:text-xl text-center font-serif italic">
            "{question}"
          </p>
        </div>
        
        {hint && (
          <div className="space-y-2">
            {!showHint ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowHint(true)}
                className="w-full"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Voir l'indice
              </Button>
            ) : (
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span>💡 Indice : {hint}</span>
                </p>
              </div>
            )}
          </div>
        )}
        
        {solved ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-secondary">
              <Sparkles className="w-6 h-6" />
              <span className="text-xl font-christmas">Bravo !</span>
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-5xl font-christmas text-primary animate-reveal-letter golden-glow inline-block px-6 py-3 rounded-xl bg-card">
              {letterToReveal}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Votre réponse..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`text-center text-lg ${
                error ? "border-destructive animate-pulse" : ""
              }`}
            />
            {error && (
              <p className="text-destructive text-center text-sm">
                Ce n'est pas la bonne réponse, essayez encore ! 🎅
              </p>
            )}
            <Button type="submit" className="w-full" size="lg">
              Vérifier ma réponse
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RiddleCard;
