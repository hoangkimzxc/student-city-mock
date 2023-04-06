import { all, call, put, takeLatest } from "redux-saga/effects";
import { RankingByCity, dashBoardActions } from "./dashboardSlice";
import { City, ListResponse, Student } from "../../models";
import studentApi from "../../api/studentApi";
import cityApi from "../../api/cityApi";

function* fetchStatistic() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      _sort: "male",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      _sort: "female",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      _mark_gte: 8,
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      _mark_lte: 5,
    }),
  ]);

  const statistic = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statistic;
  yield put(
    dashBoardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });
  yield put(dashBoardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });
  yield put(dashBoardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //Fetch city list de ta co 1 danh sach cac thanh pho
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //Fetch ranking per city, moi thanh pho se map thanh 1 cai call roi tra ve 1 obj va callList
  //la 1 mang cac obj
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "desc",
      _city: x.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = responseList.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      cityName: cityList[idx].name,
      rankingList: x.data,
    })
  );

  //Update state
  yield put(dashBoardActions.setRankingByCityList(rankingByCityList));
}

//trong fetchDashboardData thi goi ca 4 function tren cung luc chay song song
//cai nao chay xong truoc thi cap nhat state truoc
function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistic),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);
    //sau khi lay du lieu xong thi set loading la false
    yield put(dashBoardActions.fetchDataSuccess());
  } catch (error) {
    console.log("Failed to fetch dashboard data", error);
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashBoardActions.fetchData.type, fetchDashboardData);
}
