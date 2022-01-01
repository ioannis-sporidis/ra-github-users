import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isAuth = isAuthenticated && user;
  return isAuth ? children : <Navigate to="login" />;
};

export default PrivateRoute;
