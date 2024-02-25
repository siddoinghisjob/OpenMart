import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/loading";
const PrivateRoute = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

if(isLoading){
    return <Loader/>
}
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={loginWithRedirect()} />;
  }
};
export default PrivateRoute;
