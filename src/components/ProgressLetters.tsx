interface ProgressLettersProps {
    foundLetters: string[];
    totalLetters: number;
  }
  
  const ProgressLetters = ({ foundLetters, totalLetters }: ProgressLettersProps) => {
    return (
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalLetters }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-12 sm:w-12 sm:h-14 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-christmas font-bold border-2 transition-all duration-500 ${
              foundLetters[i]
                ? "bg-primary text-primary-foreground border-primary golden-glow"
                : "bg-card/50 border-border text-muted-foreground"
            }`}
          >
            {foundLetters[i] || "?"}
          </div>
        ))}
      </div>
    );
  };
  
  export default ProgressLetters;
  