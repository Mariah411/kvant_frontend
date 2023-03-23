import { IUser } from "./IUser";
import { IRating } from "./IRating";
import { IStudent } from "./IStudent";

export interface IAchievement {
  id: number;
  name: string;
  date: Date;
  diplom: string;
  place: number;
  id_rating: number;
  rating: IRating;
  workers?: IUser[];
  students?: IStudent[];
}

export interface IAchievementForTable {
  id: number;
  name: string;
  date: Date;
  diplom: string;
  place: number;
  id_rating: number;
  rating?: string;
  workers?: string;
  students?: string;
}
