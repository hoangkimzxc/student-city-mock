import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  try {
    console.log("Handle Login", payload);
    yield delay(1000);
    localStorage.setItem("access_token", "fake_token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "Easy Frontend",
      })
    );
    //redirect to admin page
    yield put(push("/admin"));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  console.log("Handle Logout");
  localStorage.removeItem("access_token");
  //redirect to login page
  yield put(push("/login"));
}

function* watchLoginFlow() {
  while (true) {
    console.log("watch login");
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
