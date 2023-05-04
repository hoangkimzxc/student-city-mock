import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { Student } from "../../../models";
import studentApi from "../../../api/studentApi";

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();

  const isEdit = Boolean(studentId);

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [studentId]);

  console.log("Found student", student);

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeftIcon /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {isEdit ? "Update student info" : "Add new student"}
      </Typography>
    </Box>
  );
}
