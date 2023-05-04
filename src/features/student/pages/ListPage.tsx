import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice";
import {
  Box,
  Button,
  Typography,
  createTheme,
  Pagination,
  LinearProgress,
} from "@mui/material";
import StudentTable from "../components/StudentTable";
import { selectCityList, selectCityMap } from "../../city/citySlice";
import StudentFilters from "../components/StudentFilters";
import { ListParams, Student } from "../../../models";
import studentApi from "../../../api/studentApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    console.log("Handle remove student", student);
    try {
      //Remove student API
      await studentApi.remove(student?.id || "");

      //Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      //Toast error
      console.log("Failed to fetch student", error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`${location.pathname}/${student.id}`);
  };

  return (
    <Box sx={{ position: "relative", paddingTop: theme.spacing(1) }}>
      {loading && (
        <LinearProgress
          sx={{ position: "absolute", top: theme.spacing(-1), width: "100%" }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing(4),
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Link to={`${location.pathname}/add`}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Student Filters */}
      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {/* Student Table */}
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />
      {/* Pagination */}
      <Box my={2} display={"flex"} justifyContent={"center"}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
