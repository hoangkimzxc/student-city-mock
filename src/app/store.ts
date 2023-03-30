import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authReducer from "../features/auth/authSlice";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  couter: counterReducer,
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
