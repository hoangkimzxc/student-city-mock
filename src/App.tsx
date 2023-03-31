import { Route, Routes } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import LoginPage from "./features/auth/pages/LoginPage";

export default function App() {
  return (
    <>
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
