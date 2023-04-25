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

const theme = createTheme();

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
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
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      {/* Student Table */}
      <StudentTable studentList={studentList} />
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