import jwtDecode from "jwt-decode";
import React, { FC, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/hooks";
import { IUser } from "./models/IUser";

const App: FC = () => {
  const { setUser, setAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
      const user = jwtDecode(localStorage.getItem("token") || "") as IUser;
      setUser(user);
    }
  }, []);
  return (
    <div>
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;
