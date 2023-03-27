import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../authSlice";

function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        //trong thuc te can phai get username va password tu login form
        username: "",
        password: "",
      })
    );
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center min-h-screen">
      <Paper elevation={3} className="p-[16px]">
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleLoginClick}
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default LoginPage;
