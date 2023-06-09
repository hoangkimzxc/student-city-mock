import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authReducer from "../features/auth/authSlice";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentReducer from "../features/student/studentSlice";
import cityReducer from "../features/city/citySlice";

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  couter: counterReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);

export type AppDispatach = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
