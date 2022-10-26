import { Link } from "react-router-dom";

const CharResultsEntry = ({ charID, charName, charImage }) => {
  return (
    <Link to={`/characters/${charID}/home`}>
      <div className="grid grid-cols-2 rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]">
        <div className="flex items-center justify-center">
          <img className="shrink" src={charImage} alt="Character Image" />
        </div>
        <div className="flex items-center justify-center">
          <h2 className="whitespace-pre-wrap text-center text-xl">
            {charName}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default CharResultsEntry;
