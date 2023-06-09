import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoute() {
  //check if user is logged in
  //if yes, show route
  //otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
