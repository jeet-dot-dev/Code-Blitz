import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/auth" replace />;
};

export default ProtectRoute;
