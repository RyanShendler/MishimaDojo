import { useAuth0, User } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Loading from "../utility/Loading";
import Unauthorized from "../utility/Unauthorized";

const AdminLogin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const match = useMatch("/admin"); //ensures redirect doesn't occur if they go to /admin/anything
  //redirects to admin home page if user is already logged in
  useEffect(() => {
    if (isAuthenticated && match) {
      navigate("/admin/home");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {!isAuthenticated ? (
        <div className="absolute left-1/2 top-1/3">
          <div className="relative -left-1/2 -top-1/3 flex flex-col items-center rounded-md border border-black bg-content p-4 shadow-md">
            <h1 className="text-4xl font-bold">Admin Login</h1>
            <button
              className="mt-4 rounded-md border border-black bg-[#EDF0F5] p-2 shadow-md"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              Please Login Here
            </button>
          </div>
        </div>
      ) : !user["https://mishimadojo.com/metadata"].admin ? (
        <Unauthorized />
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
