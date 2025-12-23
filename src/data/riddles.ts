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
      question: "Je suis le premier repas de la journée qui rime avec 'thé'.",
      hint: "On le boit souvent le matin",
      answer: "café",
      letter: "C",
    },
    {
      id: 2,
      question: "Je suis l'animal qui bâtit des barrages dans les rivières.",
      hint: "Il a une large queue plate",
      answer: "castor",
      letter: "A",
    },
    {
      id: 3,
      question: "Je suis le fruit jaune que les singes adorent.",
      hint: "On l'épluche avant de le manger",
      answer: "banane",
      letter: "B",
    },
    {
      id: 4,
      question: "Je suis l'oiseau nocturne aux grands yeux qui fait 'hou hou'.",
      hint: "Il peut tourner sa tête à 180 degrés",
      answer: "hibou",
      letter: "O",
    },
    {
      id: 5,
      question: "Je suis le continent où se trouve la Tour Eiffel.",
      hint: "Paris est dans ce continent",
      answer: "europe",
      letter: "U",
    },
    {
      id: 6,
      question: "Je suis la fleur symbole de l'amour, souvent rouge.",
      hint: "On l'offre à la Saint-Valentin",
      answer: "rose",
      letter: "R",
    },
    {
      id: 7,
      question: "Je suis le fruit utilisé pour faire du vin, en grappes.",
      hint: "Il peut être rouge ou blanc",
      answer: "raisin",
      letter: "G",
    },
  ];
  
  export const SECRET_WORD = "CABOURG";
  export const FINAL_MESSAGE = "Joyeux Noël ! On vous offre un séjour à Cabourg/Deauville !";
  