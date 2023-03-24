export interface Ikvantum {
  id: number;
  name: string;
}

export type KvantumForTable = Ikvantum & { key: number };
