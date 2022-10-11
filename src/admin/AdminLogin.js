import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../utility/Loading";

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
    <div className="absolute left-1/2 top-1/3">
      <div className="relative -left-1/2 -top-1/3 flex flex-col items-center rounded-md border border-black bg-gray-300 p-4 shadow-md">
        <h1 className="text-4xl font-bold">Admin Login</h1>
        <button
          className="mt-4 rounded-md border border-black p-2 shadow-md"
          onClick={() => {
            loginWithRedirect();
          }}
        >
          Please Login Here
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
