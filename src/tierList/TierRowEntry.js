import { useState } from "react";
import { Link } from "react-router-dom";

const TierRowEntry = ({ charID, charName, charImage }) => {
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <Link to={`/characters/${charID}/home`}>
      <div className="flex flex-col items-center rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]">
        <div
          className={`h-[80px] w-[52px] animate-pulse rounded-md bg-gray-300 ${
            imgLoading ? "inline" : "hidden"
          }`}
        />
        <img
          className={`h-[80px] w-auto ${imgLoading ? "hidden" : "inline"}`}
          src={charImage}
          onLoad={() => setImgLoading(false)}
        />
        <h5 className="text-center">{charName}</h5>
      </div>
    </Link>
  );
};

export default TierRowEntry;
