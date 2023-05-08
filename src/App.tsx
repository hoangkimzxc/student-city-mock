import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/dashboard";
import StudentFeature from "./features/student";
import ListPage from "./features/student/pages/ListPage";
import AddEditPage from "./features/student/pages/AddEditPage";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function App() {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBGhDRqXM0Jziitwo6sXU7-gpU67oChSSw",
    authDomain: "student-city-mock-c89c8.firebaseapp.com",
    projectId: "student-city-mock-c89c8",
    storageBucket: "student-city-mock-c89c8.appspot.com",
    messagingSenderId: "291427195794",
    appId: "1:291427195794:web:2d263844cdc952c1487f4b",
    measurementId: "G-0X5CT6ZRNM",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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
