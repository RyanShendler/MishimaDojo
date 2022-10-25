import { Link } from "react-router-dom";

const TierRowEntry = ({ charID, charName, charImage }) => {
  return (
    <Link to={`/characters/${charID}/home`}>
      <div className="flex flex-col items-center rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md">
        <img width="64px" src={charImage} />
        <h5 className="text-center">{charName}</h5>
      </div>
    </Link>
  );
};

export default TierRowEntry;