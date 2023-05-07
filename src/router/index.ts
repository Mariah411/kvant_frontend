import AchievementsStudentPage from "../pages/AchievementsStudentPage";
import AdditionalAdminPage from "../pages/AdditionalAdminPage";
import AllAchivementsPage from "../pages/AllAchivementsPage";
import AllGroupsPage from "../pages/AllGroupsPage";
import GroupInfoPage from "../pages/GroupInfoPage";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import ReportPage from "../pages/ReportPage";
import StudentsPage from "../pages/StudentsPage";
import TeacherGroupsPage from "../pages/TeacherGroupsPage";
import VisitsPage from "../pages/VisitsPage";

import WorkersPage from "../pages/WorkersPage";

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
  ADDITIONAL = "/additional",
  WORKERS = "/workers",
  ALL_ACHIEVEMENTS = "/achievements/all",
  MY_GROUPS = "/my_groups",
  VISITS = "/group/:id/visits",
  REPORTS = "/reports",
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
  { path: RouteNames.ADDITIONAL, component: AdditionalAdminPage },
  { path: RouteNames.WORKERS, component: WorkersPage },
  { path: RouteNames.ALL_ACHIEVEMENTS, component: AllAchivementsPage },
  { path: RouteNames.MY_GROUPS, component: TeacherGroupsPage },
  { path: RouteNames.VISITS, component: VisitsPage },
  { path: RouteNames.REPORTS, component: ReportPage },
];
