import DashboardLayout from "../components/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import AuthorizationRequired from "./AuthorizationRequired";

const Customer = () => {
  const navigate = useNavigate();
  if (authService.isAuthenticated("CUSTOMER")) {
    if (!authService.sessionExpired()) {
      return DashboardLayout(<Outlet />);
    } else {
      navigate("/");
    }
  } else {
    return <AuthorizationRequired />;
  }
};
export default Customer;
