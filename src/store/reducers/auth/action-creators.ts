import { WorkersService } from "./../../../api/WorkersService";
import { AppDispatch } from "./../../index";
import {
  AuthActionsEnum,
  SetUserAction,
  SetAuthAction,
  SetLoadingAction,
  SetErrorAction,
} from "./types";
import { IUser } from "./../../../models/IUser";
import jwt_decode from "jwt-decode";

import axios, { AxiosError } from "axios";
import { AnyAction } from "redux";

interface loginResponse {
  token: string;
  message: string;
}

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setLoading: (loading: boolean): SetLoadingAction => ({
    type: AuthActionsEnum.SET_LOADING,
    payload: loading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),

  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true));
      const { data } = await axios.post("auth/login/", {
        email,
        password,
      });
      //console.log(jwt_decode(data.token));

      localStorage.setItem("token", data.token);
      localStorage.setItem("auth", "true");

      const user: IUser = jwt_decode(data.token);

      dispatch(AuthActionCreators.setUser(user));
      dispatch(AuthActionCreators.setAuth(true));
      dispatch(AuthActionCreators.setLoading(false));
      dispatch(AuthActionCreators.setError(""));
    } catch (e: any) {
      const err = e as AxiosError<loginResponse>;
      if (typeof err.response?.data.message === "string") {
        dispatch(AuthActionCreators.setError(err.response?.data.message));
      }
      //dispatch(AuthActionCreators.setError(e.response.message));
      dispatch(AuthActionCreators.setLoading(false));
    }
  },

  registration:
    (FIO: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setLoading(true));
        const { data } = await WorkersService.registration(
          FIO,
          email,
          password
        );
        localStorage.setItem("token", data.token);
        localStorage.setItem("auth", "true");

        const user: IUser = jwt_decode(data.token);

        dispatch(AuthActionCreators.setUser(user));
        dispatch(AuthActionCreators.setAuth(true));
        dispatch(AuthActionCreators.setLoading(false));
        dispatch(AuthActionCreators.setError(""));
      } catch (e: any) {
        const err = e as AxiosError<loginResponse>;
        if (typeof err.response?.data.message === "string") {
          dispatch(AuthActionCreators.setError(err.response?.data.message));
        }
        dispatch(AuthActionCreators.setLoading(false));
      }
    },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setAuth(false));
  },
};
