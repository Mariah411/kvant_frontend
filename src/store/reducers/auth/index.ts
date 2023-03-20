import { IUser } from "./../../../models/IUser";
import { AuthState, AuthActions, AuthActionsEnum } from "./types";

export const InitialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: "",
};

export default function AuthReducer(
  state = InitialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionsEnum.SET_USER:
      return { ...state, user: action.payload };
    case AuthActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case AuthActionsEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
