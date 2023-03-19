import Login from "../pages/Login";
import MainPage from "../pages/MainPage";

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  LOGIN = "/login",
  MAIN = "/",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: MainPage },
];
