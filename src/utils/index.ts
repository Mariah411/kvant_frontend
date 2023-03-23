import { IUser } from "../models/IUser";

const checkRoles = (user: IUser, role_value: string) => {
  return user.roles.some((role) => role.value === role_value);
};

export const isTeacher = (user: IUser) => checkRoles(user, "TEACHER");
export const isAdmin = (user: IUser) => checkRoles(user, "ADMIN");
export const isEditor = (user: IUser) => checkRoles(user, "EDITOR");
