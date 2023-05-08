import { Box, Typography } from "@mui/material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { Student } from "../../../models";
import studentApi from "../../../api/studentApi";
import StudentForm from "../components/StudentForm";

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

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

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    // TODO: Handle submit here, call API to add/update student
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    navigate("/admin/students");
  };

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

      {/* Chi khoi tao form khi initialValue da san sang vi initialValue chi tao lan dau tien
      Va o trong mode edit no moi call api de lay ve du lieu cua student nen phai check dieu kien 
      tra ve roi moi render form*/}
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
