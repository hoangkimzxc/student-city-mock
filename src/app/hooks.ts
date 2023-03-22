import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatach, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
