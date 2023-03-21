import { allActionCreators } from "./../store/reducers/action-creators";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { bindActionCreators } from "redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch: any = useAppDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
