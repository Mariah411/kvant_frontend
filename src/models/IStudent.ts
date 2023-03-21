import { IGroup } from "./IGroup";
export interface IStudent {
  id: number;
  FIO: string;
  num_doc: string;
  b_date: Date;
  year_study: number;
  note: string;
  id_group?: number;
}

export type StudentsWithGroups = IStudent & { group?: IGroup };

export type StudentsForTable = IStudent & { group_name: string; key: number };