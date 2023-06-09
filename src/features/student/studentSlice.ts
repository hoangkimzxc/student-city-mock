import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ListParams,
  ListResponse,
  PaginationParams,
  Student,
} from "../../models";
import { RootState } from "../../app/store";

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
    // name_like: "litt"
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

//Actions
export const studentActions = studentSlice.actions;

//Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) =>
  state.student.pagination;

//Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
