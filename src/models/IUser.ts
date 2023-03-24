export interface IUser {
  id: number;
  email: string;
  password: string;
  FIO: string;
  roles: any[];
  achivements?: any[];
}

export interface IUserRegistration {
  email: string;
  password: string;
  FIO: string;
}

export type UserForTable = {
  id: number;
  email: string;
  password: string;
  FIO: string;
  roles: string;
  key: number;
};

export interface ITeacher {
  id: number;
  FIO: string;
}
