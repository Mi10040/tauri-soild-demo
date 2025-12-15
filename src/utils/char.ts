export type Stats = {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
};

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function defaultChar() {
  return {
    name: "",
    race: "Human",
    clas: "Fighter",
    level: 1,
    stats: {
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
    } as Stats,
  } as any;
}

export function saveToLocal(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function loadFromLocal(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return null;
  }
}
