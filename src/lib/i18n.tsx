"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "es" | "en" | "pt";
export const LANGS: { id: Lang; label: string; flag: string }[] = [
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "pt", label: "Português", flag: "🇧🇷" },
];

// [español, inglés, portugués]
const D: Record<string, [string, string, string]> = {
  // Splash / general
  salon: ["SALÓN PRIVÉ", "PRIVATE LOUNGE", "SALÃO PRIVÉ"],
  chips_only: [
    "SOLO FICHAS · SIN DINERO REAL",
    "CHIPS ONLY · NO REAL MONEY",
    "SÓ FICHAS · SEM DINHEIRO REAL",
  ],
  loading_vip: [
    "CARGANDO EXPERIENCIA VIP…",
    "LOADING VIP EXPERIENCE…",
    "CARREGANDO EXPERIÊNCIA VIP…",
  ],
  splash_footer: [
    "Casino privado entre amigos · v1.1",
    "Private casino among friends · v1.1",
    "Cassino privado entre amigos · v1.1",
  ],
  connect_fail: [
    "No pudimos conectarte. Recarga la página.",
    "We couldn't connect you. Reload the page.",
    "Não conseguimos te conectar. Recarregue a página.",
  ],
  // Navegación
  nav_home: ["Inicio", "Home", "Início"],
  nav_games: ["Juegos", "Games", "Jogos"],
  nav_ranking: ["Ranking", "Ranking", "Ranking"],
  nav_profile: ["Perfil", "Profile", "Perfil"],
  back: ["Volver", "Back", "Voltar"],
  bet: ["Apuesta", "Bet", "Aposta"],
  bet_down: ["Bajar apuesta", "Lower bet", "Diminuir aposta"],
  bet_up: ["Subir apuesta", "Raise bet", "Aumentar aposta"],
  chips: ["fichas", "chips", "fichas"],
  // Lobby
  vip_excl: ["⭐ VIP Exclusivo", "⭐ VIP Exclusive", "⭐ VIP Exclusivo"],
  daily_bonus: [
    "Bono diario Royal Vega",
    "Royal Vega daily bonus",
    "Bônus diário Royal Vega",
  ],
  claim_now: ["RECLAMAR AHORA", "CLAIM NOW", "RESGATAR AGORA"],
  claimed: ["RECLAMADO", "CLAIMED", "RESGATADO"],
  next_in: ["Próximo en", "Next in", "Próximo em"],
  available: ["Disponible", "Available", "Disponível"],
  now: ["¡Ya!", "Now!", "Já!"],
  bonus_ok: ["¡+{n} fichas!", "+{n} chips!", "+{n} fichas!"],
  bonus_already: [
    "Ya reclamaste tu bono de hoy",
    "You already claimed today's bonus",
    "Você já resgatou o bônus de hoje",
  ],
  chips_table: ["Fichas en la mesa", "Chips on the table", "Fichas na mesa"],
  in_play: ["EN JUEGO", "IN PLAY", "EM JOGO"],
  popular: ["Juegos populares", "Popular games", "Jogos populares"],
  see_all: ["Ver todos ›", "See all ›", "Ver todos ›"],
  club_top: ["Top del club", "Club top", "Top do clube"],
  ranking_link: ["Ranking ›", "Ranking ›", "Ranking ›"],
  invite: [
    "Invita a tus amigos para armar el ranking.",
    "Invite your friends to build the ranking.",
    "Convide seus amigos para montar o ranking.",
  ],
  // Actividad en vivo
  activity: ["Actividad del club", "Club activity", "Atividade do clube"],
  playing_one: ["jugando", "playing", "jogando"],
  playing_many: ["jugando ahora", "playing now", "jogando agora"],
  someone: ["Alguien", "Someone", "Alguém"],
  won_in: ["ganó en {g}", "won at {g}", "ganhou em {g}"],
  played: ["jugó {g}", "played {g}", "jogou {g}"],
  claimed_bonus: [
    "reclamó el bono diario",
    "claimed the daily bonus",
    "resgatou o bônus diário",
  ],
  no_activity: [
    "Todavía no hay jugadas. ¡Sé el primero!",
    "No plays yet. Be the first!",
    "Ainda não há jogadas. Seja o primeiro!",
  ],
  // Juegos
  gn_slots: ["Royal 777", "Royal 777", "Royal 777"],
  gn_ruleta: ["Ruleta Imperial", "Imperial Roulette", "Roleta Imperial"],
  gn_blackjack: ["Blackjack VIP", "Blackjack VIP", "Blackjack VIP"],
  gn_vivo: ["Salas VIP en Vivo", "Live VIP Rooms", "Salas VIP ao Vivo"],
  gn_bono: ["Bono diario", "Daily bonus", "Bônus diário"],
  gt_slots: ["Hasta x50", "Up to x50", "Até x50"],
  gt_ruleta: ["Europea", "European", "Europeia"],
  gt_blackjack: ["Paga 3:2", "Pays 3:2", "Paga 3:2"],
  gt_vivo: ["Pronto", "Soon", "Em breve"],
  gd_slots: [
    "Tragamonedas de 3 líneas con coronas, diamantes y el 7 dorado.",
    "3-line slot machine with crowns, diamonds and the golden 7.",
    "Caça-níquel de 3 linhas com coroas, diamantes e o 7 dourado.",
  ],
  gd_ruleta: [
    "Ruleta europea de un cero. Pleno paga 35 a 1.",
    "Single-zero European roulette. Straight up pays 35 to 1.",
    "Roleta europeia de um zero. Pleno paga 35 para 1.",
  ],
  gd_blackjack: [
    "Gánale al crupier sin pasarte de 21. Blackjack paga 3 a 2.",
    "Beat the dealer without going over 21. Blackjack pays 3 to 2.",
    "Vença o dealer sem passar de 21. Blackjack paga 3 para 2.",
  ],
  gd_vivo: [
    "Mesas en vivo con tus amigos. Próximamente.",
    "Live tables with your friends. Coming soon.",
    "Mesas ao vivo com seus amigos. Em breve.",
  ],
  catalog: ["Catálogo de juegos", "Game catalog", "Catálogo de jogos"],
  search_game: ["Buscar juego…", "Search game…", "Buscar jogo…"],
  cat_all: ["Todos", "All", "Todos"],
  cat_slots: ["Slots", "Slots", "Slots"],
  cat_mesa: ["Mesa", "Table", "Mesa"],
  cat_vivo: ["En vivo", "Live", "Ao vivo"],
  no_results: [
    "No hay juegos con ese nombre.",
    "No games with that name.",
    "Nenhum jogo com esse nome.",
  ],
  // Slots
  slots_sub: [
    "3 LÍNEAS · HASTA x50",
    "3 LINES · UP TO x50",
    "3 LINHAS · ATÉ x50",
  ],
  you_won: ["¡Ganaste!", "You won!", "Você ganhou!"],
  no_win_again: [
    "Sin premio esta vez… ¡otra!",
    "No win this time… again!",
    "Sem prêmio desta vez… de novo!",
  ],
  auto: ["AUTO", "AUTO", "AUTO"],
  stop: ["PARAR", "STOP", "PARAR"],
  spin: ["GIRAR", "SPIN", "GIRAR"],
  spinning: ["GIRANDO…", "SPINNING…", "GIRANDO…"],
  paytable: [
    "Tabla de pagos (3 iguales en línea)",
    "Paytable (3 of a kind on a line)",
    "Tabela de pagamentos (3 iguais na linha)",
  ],
  pay_note: [
    "🍒🍒 al inicio de una línea devuelve la apuesta de esa línea. La apuesta se reparte entre las 3 líneas.",
    "🍒🍒 at the start of a line returns that line's bet. Your bet is split across the 3 lines.",
    "🍒🍒 no início de uma linha devolve a aposta dessa linha. A aposta é dividida entre as 3 linhas.",
  ],
  // Ruleta
  history_empty: [
    "Últimos números aparecerán aquí",
    "Last numbers will appear here",
    "Os últimos números aparecerão aqui",
  ],
  no_win: ["Sin premio", "No win", "Sem prêmio"],
  d1: ["1ª 12", "1st 12", "1ª 12"],
  d2: ["2ª 12", "2nd 12", "2ª 12"],
  d3: ["3ª 12", "3rd 12", "3ª 12"],
  even: ["PAR", "EVEN", "PAR"],
  odd: ["IMPAR", "ODD", "ÍMPAR"],
  clear_bets: ["Limpiar apuestas", "Clear bets", "Limpar apostas"],
  on_table: ["En mesa", "On table", "Na mesa"],
  roulette_rules: [
    "Pleno 35:1 · Docena 2:1 · Rojo/Negro, Par/Impar, 1-18/19-36 1:1",
    "Straight 35:1 · Dozen 2:1 · Red/Black, Even/Odd, 1-18/19-36 1:1",
    "Pleno 35:1 · Dúzia 2:1 · Vermelho/Preto, Par/Ímpar, 1-18/19-36 1:1",
  ],
  // Blackjack
  bj_rules: [
    "BLACKJACK PAGA 3 A 2 · CRUPIER SE PLANTA EN 17",
    "BLACKJACK PAYS 3 TO 2 · DEALER STANDS ON 17",
    "BLACKJACK PAGA 3 PARA 2 · DEALER PARA NO 17",
  ],
  dealer: ["CRUPIER", "DEALER", "DEALER"],
  place_bet: ["Haz tu apuesta", "Place your bet", "Faça sua aposta"],
  you: ["TÚ", "YOU", "VOCÊ"],
  r_win: ["¡GANASTE!", "YOU WIN!", "VOCÊ GANHOU!"],
  r_blackjack: ["¡BLACKJACK!", "BLACKJACK!", "BLACKJACK!"],
  r_push: ["EMPATE", "PUSH", "EMPATE"],
  r_lose: ["GANA LA CASA", "HOUSE WINS", "A CASA GANHA"],
  plus_chips: ["+{n} fichas", "+{n} chips", "+{n} fichas"],
  hit: ["PEDIR", "HIT", "PEDIR"],
  stand: ["PLANTARSE", "STAND", "PARAR"],
  double: ["DOBLAR", "DOUBLE", "DOBRAR"],
  deal: ["REPARTIR", "DEAL", "DAR CARTAS"],
  new_hand: ["OTRA MANO", "NEW HAND", "NOVA MÃO"],
  // Ranking
  ranking_title: ["Ranking del club", "Club ranking", "Ranking do clube"],
  most_chips: ["Más fichas", "Most chips", "Mais fichas"],
  biggest_win: ["Mayor premio", "Biggest win", "Maior prêmio"],
  you_tag: ["(tú)", "(you)", "(você)"],
  plays_n: ["{n} jugadas", "{n} plays", "{n} jogadas"],
  loading: ["Cargando…", "Loading…", "Carregando…"],
  // Perfil
  vip_member: ["Miembro VIP", "VIP Member", "Membro VIP"],
  stat_chips: ["Fichas", "Chips", "Fichas"],
  stat_plays: ["Jugadas", "Plays", "Jogadas"],
  history: ["Historial", "History", "Histórico"],
  bet_n: ["apuesta {n}", "bet {n}", "aposta {n}"],
  no_history: [
    "Aún no has jugado. ¡A la mesa!",
    "You haven't played yet. To the table!",
    "Você ainda não jogou. Para a mesa!",
  ],
  responsible: ["Juego responsable", "Responsible gaming", "Jogo responsável"],
  responsible_text: [
    "Royal Vega es un club privado entre amigos. Las fichas no tienen valor real y no se pueden comprar ni canjear por dinero.",
    "Royal Vega is a private club among friends. Chips have no real value and cannot be bought or exchanged for money.",
    "Royal Vega é um clube privado entre amigos. As fichas não têm valor real e não podem ser compradas nem trocadas por dinheiro.",
  ],
  device_note: [
    "Tu jugador queda guardado en este dispositivo. Si borras los datos del navegador, se crea uno nuevo.",
    "Your player is saved on this device. If you clear your browser data, a new one is created.",
    "Seu jogador fica salvo neste dispositivo. Se você apagar os dados do navegador, um novo será criado.",
  ],
  language: ["Idioma", "Language", "Idioma"],
  save: ["Guardar", "Save", "Salvar"],
  // Errores del servidor (clave = mensaje en español)
  "Saldo insuficiente": [
    "Saldo insuficiente",
    "Insufficient balance",
    "Saldo insuficiente",
  ],
  "Apuesta mínima: 100 fichas": [
    "Apuesta mínima: 100 fichas",
    "Minimum bet: 100 chips",
    "Aposta mínima: 100 fichas",
  ],
  "Apuesta mínima por casilla: 100": [
    "Apuesta mínima por casilla: 100",
    "Minimum bet per spot: 100",
    "Aposta mínima por casa: 100",
  ],
  "Ya tienes una mano en curso": [
    "Ya tienes una mano en curso",
    "You already have a hand in progress",
    "Você já tem uma mão em andamento",
  ],
  "Mano no encontrada o terminada": [
    "Mano no encontrada o terminada",
    "Hand not found or finished",
    "Mão não encontrada ou encerrada",
  ],
  "Solo puedes doblar con 2 cartas": [
    "Solo puedes doblar con 2 cartas",
    "You can only double with 2 cards",
    "Só pode dobrar com 2 cartas",
  ],
  "Nombre entre 2 y 20 caracteres": [
    "Nombre entre 2 y 20 caracteres",
    "Name must be 2 to 20 characters",
    "Nome entre 2 e 20 caracteres",
  ],
  "Sin apuestas": ["Sin apuestas", "No bets placed", "Sem apostas"],
  "Algo salió mal": [
    "Algo salió mal",
    "Something went wrong",
    "Algo deu errado",
  ],
};

const IDX: Record<Lang, number> = { es: 0, en: 1, pt: 2 };
const KEY = "rv_lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string, vars?: Record<string, string | number>) => string;
};
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let l: Lang | null = null;
    try {
      l = localStorage.getItem(KEY) as Lang | null;
    } catch {}
    if (!l || !(l in IDX)) {
      const nav = (navigator.language || "es").slice(0, 2);
      l = nav === "en" ? "en" : nav === "pt" ? "pt" : "es";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (k: string, vars?: Record<string, string | number>) => {
      let s = D[k]?.[IDX[lang]] ?? k;
      if (vars)
        for (const [n, v] of Object.entries(vars))
          s = s.replace(`{${n}}`, String(v));
      return s;
    },
    [lang],
  );

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
  );
}

export function useT() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useT fuera de LangProvider");
  return c;
}

/** Selector compacto de idioma (bandera). */
export function LangSwitch({ full = false }: { full?: boolean }) {
  const { lang, setLang } = useT();
  if (full)
    return (
      <div className="grid grid-cols-3 gap-2">
        {LANGS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLang(l.id)}
            className={`flex h-11 items-center justify-center gap-1.5 rounded-xl text-xs font-bold ${lang === l.id ? "btn-violet" : "glass text-muted"}`}
          >
            <span className="text-base">{l.flag}</span> {l.label}
          </button>
        ))}
      </div>
    );
  const i = LANGS.findIndex((l) => l.id === lang);
  const next = LANGS[(i + 1) % LANGS.length];
  return (
    <button
      onClick={() => setLang(next.id)}
      className="grid h-9 min-w-9 place-items-center rounded-full glass px-2 text-[11px] font-black"
      aria-label={`Language: ${LANGS[i].label}`}
      title={LANGS[i].label}
    >
      {LANGS[i].flag}
    </button>
  );
}
