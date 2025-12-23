import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, TreePine } from "lucide-react";
import Snowfall from "@/components/Snowfall";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen christmas-bg relative overflow-hidden">
      <Snowfall />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-secondary opacity-50">
          <TreePine className="w-16 h-16" />
        </div>
        <div className="absolute top-10 right-10 text-secondary opacity-50">
          <TreePine className="w-16 h-16" />
        </div>
        
        {/* Main content */}
        <div className="text-center max-w-2xl mx-auto space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              <Sparkles className="w-8 h-8 text-accent animate-twinkle" />
              <Sparkles className="w-8 h-8 text-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
              <Sparkles className="w-8 h-8 text-accent animate-twinkle" style={{ animationDelay: "1s" }} />
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-christmas text-primary drop-shadow-lg">
              Joyeux Noël !
            </h1>
            
            <p className="text-xl sm:text-2xl text-foreground/80 font-serif">
              Papa, Maman, un cadeau vous attend...
            </p>
          </div>
          
          {/* Gift box illustration */}
          <div className="relative inline-block animate-float">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-primary rounded-2xl flex items-center justify-center golden-glow">
              <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-primary-foreground" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-accent" />
          </div>
          
          {/* Description */}
          <div className="space-y-4 bg-card/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border">
            <p className="text-lg text-foreground/90 font-serif">
              Pour découvrir votre cadeau, vous devez résoudre <strong className="text-primary">7 énigmes</strong>.
            </p>
            <p className="text-muted-foreground font-serif">
              Chaque bonne réponse révélera une lettre mystère... 
              <br />
              Assemblez-les toutes pour découvrir la surprise ! 🎁
            </p>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={() => navigate("/riddle/1")}
            size="lg"
            className="text-xl px-8 py-6 font-christmas golden-glow hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Commencer l'aventure
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
        
        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-secondary/20 to-transparent" />
      </div>
    </div>
  );
};

export default Index;
