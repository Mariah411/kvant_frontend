import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { $CombinedState } from "redux";
import { useAppSelector } from "../hooks/hooks";
import { privateRoutes, publicRoutes, RouteNames } from "../router";
import { RootState } from "../store";

const AppRouter: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            Component={route.component}
            key={route.path}
          />
        ))}
      </Routes>
      <Navigate to={RouteNames.MAIN} replace={true} />
    </>
  ) : (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            Component={route.component}
            key={route.path}
          />
        ))}
      </Routes>
      <Navigate to={RouteNames.LOGIN} replace={true} />
    </>
  );
};

export default AppRouter;
