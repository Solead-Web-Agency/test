export interface Riddle {
    id: number;
    question: string;
    hint?: string;
    answer: string;
    letter: string;
  }
  
  export const riddles: Riddle[] = [
    {
      id: 1,
      question: "Je suis l'établissement où l'on joue à la roulette et au blackjack.",
      hint: "On me trouve souvent dans les stations balnéaires",
      answer: "casino",
      letter: "C",
    },
    {
      id: 2,
      question: "Je suis l'adjectif qui qualifie une station de bord de mer.",
      hint: "Je suis lié aux bains et à la thalassothérapie",
      answer: "balnéaire",
      letter: "B",
    },
    {
      id: 3,
      question: "Je suis le chiffre qui précède 'été' dans un célèbre roman français.",
      hint: "C'est le premier chiffre",
      answer: "un",
      letter: "U",
    },
    {
      id: 4,
      question: "Je suis l'adjectif qui qualifie un hôtel de luxe sur la côte normande.",
      hint: "Je suis l'opposé de 'petit'",
      answer: "grand",
      letter: "G",
    },
    {
      id: 5,
      question: "Je suis le style des villas de la Belle Époque avec leurs façades ornées.",
      hint: "Je concerne l'art de construire des bâtiments",
      answer: "architecture",
      letter: "A",
    },
    {
      id: 6,
      question: "Je suis la grande étendue d'eau salée qui borde les plages normandes.",
      hint: "Mes vagues bercent les côtes",
      answer: "océan",
      letter: "O",
    },
    {
      id: 7,
      question: "Je suis les compétitions nautiques où les voiliers s'affrontent.",
      hint: "On m'organise souvent en été sur la côte",
      answer: "régates",
      letter: "R",
    },
  ];
  
  export const SECRET_WORD = "CABOURG";
  export const FINAL_MESSAGE = "🎁 Joyeux Noël ! 🎁";
  export const FINAL_MESSAGE_2 = "Je vous offre un séjour à Cabourg ou Deauville !";
  