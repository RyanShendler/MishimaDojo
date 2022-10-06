import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AdminLogin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  //redirects to admin home page if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/home");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Login Screen</h1>
      <button onClick={() => loginWithRedirect()}>Login Button</button>
    </div>
  );
};

export default AdminLogin;
