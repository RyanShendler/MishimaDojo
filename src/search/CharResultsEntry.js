import { useState } from "react";
import { Link } from "react-router-dom";

const CharResultsEntry = ({ charID, charName, charImage }) => {
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <Link to={`/characters/${charID}/home`}>
      <div className="grid grid-cols-2 rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]">
        <div className="flex items-center justify-center">
          <div
            className={`h-[102px] w-[66px] animate-pulse rounded-md bg-gray-300 ${
              imgLoading ? "inline" : "hidden"
            }`}
          />
          <img
            className={`${imgLoading ? "hidden" : "inline"}`}
            src={charImage}
            alt="Character Image"
            onLoad={() => setImgLoading(false)}
          />
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
