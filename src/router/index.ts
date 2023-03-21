import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import StudentsPage from "../pages/StudentsPage";

export interface IRoute {
  path: string;
  component?: React.ComponentType;
}

export enum RouteNames {
  LOGIN = "/login",
  MAIN = "/",
  STUDENTS = "/students",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: MainPage },
  { path: RouteNames.STUDENTS, component: StudentsPage },
];
