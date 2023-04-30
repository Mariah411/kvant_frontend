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
  workers: IUser[];
  students: IStudent[];
  image: any;
}

export interface IAchievementForTable {
  id: number;
  name: string;
  date: Date;
  diplom: string;
  place: number;
  id_rating: string;
  workers: string;
  students: string;
  image: any;
}

export type AchievementForCreate = {
  id: number;
  name: string;
  date: Date;
  diplom: string;
  place: number;
  id_rating: number;
  rating: string;
  workers: string[] | number[];
  students: string[] | number[];
  image: any;
};
