import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/dashboard";
import StudentFeature from "./features/student";
import ListPage from "./features/student/pages/ListPage";
import AddEditPage from "./features/student/pages/AddEditPage";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/students" element={<ListPage />} />
          <Route path="/admin/students/add" element={<AddEditPage />} />
          <Route path="/admin/students/:studentId" element={<AddEditPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
