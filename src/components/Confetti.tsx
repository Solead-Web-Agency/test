import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

const colors = [
  "hsl(0, 70%, 50%)",    // Red
  "hsl(140, 40%, 40%)",  // Green
  "hsl(45, 90%, 55%)",   // Gold
  "hsl(0, 0%, 100%)",    // White
  "hsl(0, 70%, 60%)",    // Light red
];

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const confetti: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
    }));
    setPieces(confetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
