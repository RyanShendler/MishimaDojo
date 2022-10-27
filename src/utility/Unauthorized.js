import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Unauthorized = () => {
  const { logout, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="absolute left-1/2 top-1/3">
      {isLoading ? (
        <Loading />
      ) : !isAuthenticated ? (
        <h3>You are not signed in</h3>
      ) : (
        <div className="shadow-m relative -left-1/2 -top-1/3 flex flex-col items-center space-y-4 rounded-md border border-black bg-content p-4">
          <h2 className="text-2xl font-bold">
            You Do Not Have Permission to View This Page
          </h2>
          <button
            className="rounded-md border border-black bg-[#EDF0F5] p-2 text-xl shadow-sm"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Unauthorized;
