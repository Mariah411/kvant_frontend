export interface IUser {
  id: number;
  email: string;
  password: string;
  FIO: string;
  roles: any[];
}

export interface ITeacher {
  id: number;
  FIO: string;
}
