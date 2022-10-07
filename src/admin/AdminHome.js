import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import CharacterList from "./CharacterList";
import Loading from "../utility/Loading";
import Unauthorized from "../utility/Unauthorized";
import TagList from "./TagList";

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
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-3xl">Admin Home</h1>
      <div
        id="admin-info"
        className="flex flex-row items-center justify-center space-x-6 rounded-md border border-black bg-gray-200 p-4 shadow-md"
      >
        <h2 className="text-3xl">You are logged in as {user.name}</h2>
        <button
          className="rounded-md border border-black p-2 text-xl shadow-sm"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout Here
        </button>
      </div>
      <div className="flex flex-row justify-center space-x-4">
        <CharacterList />
        <TagList />
      </div>
    </div>
  );
};

export default AdminHome;
