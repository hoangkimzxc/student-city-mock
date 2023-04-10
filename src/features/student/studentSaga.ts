import { call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse, Student } from "../../models";
import studentApi from "../../api/studentApi";

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch student list", error);
    yield studentActions.fetchStudentListFailed();
  }
}

export default function* studentSaga() {
  // watach fetch student action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
}
