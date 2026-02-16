export interface Template {
  id: string;
  name: string;
  category: "free" | "premium";
  description: string;
}

export const templates: Template[] = [
  { id: "minimalist", name: "Minimalist", category: "free", description: "Čistý a jednoduchý design" },
  { id: "corporate", name: "Corporate", category: "free", description: "Profesionální firemní styl" },
  { id: "creative", name: "Creative", category: "free", description: "Kreativní a moderní" },
  { id: "elegant", name: "Elegant", category: "free", description: "Elegantní s jemnými detaily" },
  { id: "bold", name: "Bold", category: "free", description: "Výrazný a sebevědomý" },
  { id: "classic", name: "Classic", category: "free", description: "Nadčasová klasika" },
  { id: "startup", name: "Startup", category: "free", description: "Moderní pro startupy" },
  { id: "consultant", name: "Consultant", category: "free", description: "Profesionální poradce" },
  { id: "developer", name: "Developer", category: "free", description: "Pro vývojáře a tech" },
  { id: "designer", name: "Designer", category: "free", description: "Pro kreativce a designéry" },
  { id: "premium-gradient", name: "Gradient Pro", category: "premium", description: "Prémiový s gradientem" },
  { id: "premium-animated", name: "Animated Pro", category: "premium", description: "S animovaným GIF prvkem" },
  { id: "premium-dark", name: "Dark Pro", category: "premium", description: "Tmavý elegantní styl" },
  { id: "premium-neon", name: "Neon Pro", category: "premium", description: "Neonové akcenty" },
];

export const EMAIL_FONTS = [
  "Arial",
  "Verdana",
  "Georgia",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Courier New",
  "Helvetica",
];
