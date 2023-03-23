import AchievementsStudentPage from "../pages/AchievementsStudentPage";
import AllGroupsPage from "../pages/AllGroupsPage";
import GroupInfoPage from "../pages/GroupInfoPage";
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
  ALL_GROUPS = "/allgroups",
  GROUP_ID = "/group/:id",
  ACHIEVEMENT_STUDENT = "/ahievements/student/:id",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.MAIN, component: MainPage },
  { path: RouteNames.STUDENTS, component: StudentsPage },
  { path: RouteNames.ALL_GROUPS, component: AllGroupsPage },
  { path: RouteNames.GROUP_ID, component: GroupInfoPage },
  { path: RouteNames.ACHIEVEMENT_STUDENT, component: AchievementsStudentPage },
];
