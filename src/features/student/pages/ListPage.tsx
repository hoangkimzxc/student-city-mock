import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectStudentList, studentActions } from "../studentSlice";
import { Box, Button, Typography, createTheme } from "@mui/material";
import StudentTable from "../components/StudentTable";

const theme = createTheme();

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, [dispatch]);
  return (
    <Box>
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
    </Box>
  );
}
