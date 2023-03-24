export interface IRating {
  id: number;
  points: number;
  description: string;
}

export type RaitingForTable = IRating & { key: number };
