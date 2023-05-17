import { IUser } from "../models/IUser";

const checkRoles = (user: IUser, role_value: string) => {
  return user.roles.some((role) => role.value === role_value);
};

export const isTeacher = (user: IUser) => checkRoles(user, "TEACHER");
export const isAdmin = (user: IUser) => checkRoles(user, "ADMIN");
export const isEditor = (user: IUser) => checkRoles(user, "EDITOR");

export const filterData = (new_data: any, filterValue: string) => {
  new_data = new_data.filter((el: any) => {
    let flag = false;
    Object.keys(el).some((key) => {
      if (
        el[key]
          .toString()
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase())
      )
        flag = true;
    });

    return flag;
  });

  return new_data;
};
