import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import cityApi from "./api/cityApi";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import { LoginPage } from "./features/auth/pages/LoginPage";

export default function App() {
  useEffect(() => {
    cityApi
      .getAll()
      .then((res) => res.data.forEach((i) => console.log(i.name)));
  });
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="admin" element={<AdminLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
