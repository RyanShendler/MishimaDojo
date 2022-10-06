import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Unauthorized from "./Unauthorized";

const AdminHome = () => {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  //display message if user is not admin
  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Logout Button
      </button>
    </div>
  );
};

export default AdminHome;
