import { Link } from "react-router-dom";

const RosterEntry = ({ charID, charName, charImage }) => {
  return (
    <Link to={`/characters/${charID}/home`}>
      <div className="flex flex-col items-center rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]">
        <img className="h-[96px] w-auto" src={charImage} />
        <h5 className="p-1 text-center text-xl">{charName}</h5>
      </div>
    </Link>
  );
};

export default RosterEntry;
