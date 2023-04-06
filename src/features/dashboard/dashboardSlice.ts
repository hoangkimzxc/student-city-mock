import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student } from "../../models";
import { RootState } from "../../app/store";

export interface DashboardStatistic {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistic;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
    setStatistics(state, action: PayloadAction<DashboardStatistic>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

//Actions
export const dashBoardActions = dashboardSlice.actions;

//Selectors
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;

export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistics;

export const selectHighestStudentList = (state: RootState) =>
  state.dashboard.highestStudentList;

export const selectLowestStudentList = (state: RootState) =>
  state.dashboard.lowestStudentList;

export const selectRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
