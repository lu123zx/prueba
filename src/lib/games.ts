export type Game = {
  slug: string;
  href: string;
  name: string;
  tag: string;
  category: "slots" | "mesa" | "vivo";
  desc: string;
  gradient: string;
  emoji: string;
  ready: boolean;
};

export const GAMES: Game[] = [
  {
    slug: "slots",
    href: "/slots",
    name: "Royal 777",
    tag: "Hasta x50",
    category: "slots",
    desc: "Tragamonedas de 3 líneas con coronas, diamantes y el 7 dorado.",
    gradient: "from-[#5b21b6] via-[#2e1065] to-[#120a24]",
    emoji: "👑",
    ready: true,
  },
  {
    slug: "ruleta",
    href: "/ruleta",
    name: "Ruleta Imperial",
    tag: "Europea",
    category: "mesa",
    desc: "Ruleta europea de un cero. Pleno paga 35 a 1.",
    gradient: "from-[#7f1d1d] via-[#3b0a0a] to-[#120a0a]",
    emoji: "🎡",
    ready: true,
  },
  {
    slug: "blackjack",
    href: "/blackjack",
    name: "Blackjack VIP",
    tag: "Paga 3:2",
    category: "mesa",
    desc: "Gánale al crupier sin pasarte de 21. Blackjack paga 3 a 2.",
    gradient: "from-[#065f46] via-[#022c22] to-[#04120d]",
    emoji: "🃏",
    ready: true,
  },
  {
    slug: "vivo",
    href: "#",
    name: "Salas VIP en Vivo",
    tag: "Pronto",
    category: "vivo",
    desc: "Mesas en vivo con tus amigos. Próximamente.",
    gradient: "from-[#78350f] via-[#2a1405] to-[#120a05]",
    emoji: "🎥",
    ready: false,
  },
];
