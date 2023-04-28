import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { City, Student } from "../../../models";
import { Box, Button, Typography, createTheme } from "@mui/material";
import { capitalizeString, getMarkColor } from "../../../utils";

const theme = createTheme();

export interface StudentTableProps {
  studentList: Student[];
  cityMap: { [key: string]: City };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    // Set selected student
    setSelectedStudent(student);
    //Show confirm dialog
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    // Call and wait onRemove
    onRemove?.(student);

    //hide dialog
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box fontWeight={"bold"} color={getMarkColor(student.mark)}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onEdit?.(student)}
                    sx={{ marginRight: theme.spacing(1) }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". This
            action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
