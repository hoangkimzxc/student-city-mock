import { Button } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import cityApi from "./api/cityApi";
import { useAppDispatch } from "./app/hooks";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import { authActions } from "./features/auth/authSlice";
import LoginPage from "./features/auth/pages/LoginPage";

export default function App() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   cityApi
  //     .getAll()
  //     .then((res) => res.data.forEach((i) => console.log(i.name)));
  // });
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(authActions.logout())}
      >
        Logout
      </Button>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="admin" element={<AdminLayout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
