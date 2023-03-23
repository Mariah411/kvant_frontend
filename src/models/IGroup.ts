import { IStudent } from "./IStudent";
import { Ikvantum } from "./IKvamtum";
import { IUser } from "./IUser";
export interface IGroup {
  id: number;
  name: string;
  age: string;
  shedule: string;
  id_teacher: number;
  id_kvantum: number;
}

export type GroupsWithKvantumsAndTeachers = IGroup & {
  teacher: IUser;
  kvantum: Ikvantum;
};

export interface GroupForTable {
  key: number;
  id: number;
  name: string;
  age: string;
  shedule: string;
  id_teacher: number | string;
  id_kvantum: number | string;
}

export type GroupsAllInfo = IGroup & {
  teacher: IUser;
  kvantum: Ikvantum;
  students: IStudent[];
};
