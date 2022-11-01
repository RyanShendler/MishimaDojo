import {
  useParams,
  Link,
  Outlet,
  useLocation,
  NavLink,
} from "react-router-dom";
import CharPageHeader from "./CharPageHeader";

const CharacterPage = () => {
  const { charID } = useParams();

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Link
        className="self-end rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm hover:bg-[#F7F8FA]"
        to="/"
      >
        Back to Roster
      </Link>
      <div className="flex max-h-[82vh] w-[66%] flex-row rounded-md border border-black bg-content shadow-md">
        <CharPageHeader charID={charID} />
        <div className="flex w-full flex-col">
          <nav className="flex w-full justify-evenly border-b border-black">
            <NavLink
              to={"home"}
              className={({ isActive }) =>
                isActive
                  ? "w-full cursor-pointer border-r border-black bg-header text-center text-xl text-white"
                  : "w-full cursor-pointer border-r border-black text-center text-xl"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"moves"}
              className={({ isActive }) =>
                isActive
                  ? "w-full cursor-pointer border-r border-black bg-header text-center text-xl text-white"
                  : "w-full cursor-pointer border-r border-black text-center text-xl"
              }
              onClick={() => setComponent("Movelist")}
            >
              Movelist
            </NavLink>
            <NavLink
              to={"stances"}
              className={({ isActive }) =>
                isActive
                  ? "w-full cursor-pointer border-r border-black bg-header text-center text-xl text-white"
                  : "w-full cursor-pointer border-r border-black text-center text-xl"
              }
              onClick={() => setComponent("Stances")}
            >
              Stances
            </NavLink>
            <NavLink
              to={"combos"}
              className={({ isActive }) =>
                isActive
                  ? "w-full cursor-pointer border-r border-black bg-header text-center text-xl text-white"
                  : "w-full cursor-pointer border-r border-black text-center text-xl"
              }
              onClick={() => setComponent("Combos")}
            >
              Combos
            </NavLink>
            <NavLink
              to={"punishers"}
              className={({ isActive }) =>
                isActive
                  ? "w-full cursor-pointer bg-header text-center text-xl text-white"
                  : "w-full cursor-pointer  text-center text-xl"
              }
              onClick={() => setComponent("Punishers")}
            >
              Punishers
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
