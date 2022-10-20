import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CharPageCombos from "./CharPageCombos";
import CharPageHeader from "./CharPageHeader";
import CharPageHome from "./CharPageHome";
import CharPageMovelist from "./CharPageMovelist";
import CharPagePunishers from "./CharPagePunishers";
import CharPageStances from "./CharPageStances";

const CharacterPage = () => {
  const { charID } = useParams();
  const [component, setComponent] = useState("Home");

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Link
        className="self-end rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm"
        to="/"
      >
        Back to Roster
      </Link>
      <div className="flex min-w-[66%] flex-row rounded-md border border-black bg-content shadow-md">
        <CharPageHeader charID={charID} />
        <div className="flex w-full flex-col">
          <nav className="flex w-full justify-evenly border-b border-black">
            <button
              className={`w-full cursor-pointer border-r border-black text-center text-xl ${
                component === "Home" ? "bg-header text-white" : ""
              }`}
              onClick={() => setComponent("Home")}
            >
              Home
            </button>
            <button
              className={`w-full cursor-pointer border-r border-black text-center text-xl ${
                component === "Movelist" ? "bg-header text-white" : ""
              }`}
              onClick={() => setComponent("Movelist")}
            >
              Movelist
            </button>
            <button
              className={`w-full cursor-pointer border-r border-black text-center text-xl ${
                component === "Stances" ? "bg-header text-white" : ""
              }`}
              onClick={() => setComponent("Stances")}
            >
              Stances
            </button>
            <button
              className={`w-full cursor-pointer border-r border-black text-center text-xl ${
                component === "Combos" ? "bg-header text-white" : ""
              }`}
              onClick={() => setComponent("Combos")}
            >
              Combos
            </button>
            <button
              className={`w-full cursor-pointer text-center text-xl ${
                component === "Punishers" ? "bg-header text-white" : ""
              }`}
              onClick={() => setComponent("Punishers")}
            >
              Punishers
            </button>
          </nav>
          {component === "Punishers" ? (
            <CharPagePunishers />
          ) : component === "Combos" ? (
            <CharPageCombos />
          ) : component === "Stances" ? (
            <CharPageStances />
          ) : component === "Movelist" ? (
            <CharPageMovelist />
          ) : (
            <CharPageHome />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
