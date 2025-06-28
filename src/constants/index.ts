export const ITEMS: Record<number | string, string> = {
  // prepare potion
  501: 'Poção Vermelha',
  503: 'Poção Amarela',
  504: 'Poção Branca',
  970: 'Álcool',
  7135: 'Frasco de Fogo Grego',
  7136: 'Frasco de Ácido',
  7137: 'Frasco de Planta',
  7138: 'Frasco de Esfera Marinha',
  505: 'Poção Azul',
  605: 'Analgésico',
  606: 'Aloe Vera',
  7142: 'Embrião',
  12118: 'Poção Anti-Fogo',
  12119: 'Poção Anti-Água',
  12120: 'Poção Anti-Terra',
  12121: 'Poção Anti-Vento',
  545: 'Poção Vermelha Compacta',
  546: 'Poção Amarela Compacta',
  547: 'Poção Branca Compacta',
  7139: 'Frasco de Revestimento',
  // special pharmacy
  12428: 'Poção Branca Especial',
  12422: 'Poção Pequena de HP',
  12425: 'Poção Pequena de SP',
  6212: 'Esporo de Cogumelo Explosivo',
  12426: 'Poção Média de SP',
  12436: 'Poção Vitata 500',
  12437: 'Suco Celular Enriquecido',
  6210: 'Semente de Planta Selvagem',
  6211: 'Semente de Planta Sanguessuga',
  12423: 'Poção Média de HP',
  12427: 'Poção Grande de SP',
  12475: 'Poção de Recuperação',
  12424: 'Poção Grande de HP',
  1100003: 'Elixir Vermelho',
  100232: 'Energético Físico',
  100233: 'Energético Mágico',
  1100004: 'Elixir Azul',
  1100005: 'Elixir Dourado',
  100231: 'Poção X'
} as const;

export const PREPARE_POTION_ITEMS = [
  {
    ids: [501, 503, 504],
    difficulty: {
      min: 15,
      max: 25
    }
  },
  {
    ids: [970],
    difficulty: {
      min: 5,
      max: 15
    }
  },
  {
    ids: [7135, 7136, 7137, 7138],
    difficulty: {
      min: -5,
      max: 5
    }
  },
  {
    ids: [505, 605, 606, 7142, 545, 12118, 12119, 12120, 12121],
    difficulty: {
      min: -5,
      max: -5
    }
  },
  {
    ids: [546],
    difficulty: {
      min: -10,
      max: -5
    }
  },
  {
    ids: [547, 7139],
    difficulty: {
      min: -15,
      max: -5
    }
  }
] as const;

export const SP_PHARMACY_ITEMS = [
  { ids: [12428, 12422, 12425], rate: 10 },
  { ids: [6212, 12426], rate: 15 },
  { ids: [12436, 12423, 12427], rate: 20 },
  { ids: [12437, 6210, 6211], rate: 30 },
  { ids: [12475, 12424], rate: 40 },
  { ids: [1100003], rate: 80 },
  { ids: [100232, 100233], rate: 120 },
  { ids: [1100004, 1100005, 100231], rate: 160 }
] as const;

export const SP_PHARMACY_POTIONS_PER_LEVEL: Record<number, number> = {
  1: 7,
  2: 8,
  3: 8,
  4: 9,
  5: 9,
  6: 10,
  7: 10,
  8: 11,
  9: 11,
  10: 12
} as const;

export const SP_PHARMACY_RANDOMNESS = {
  lowest: 30,
  highest: 150,

  chemicalProtection: {
    lowest: 4,
    highest: 10
  }
} as const;
