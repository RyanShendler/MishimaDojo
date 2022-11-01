import { useState } from "react";
import { Link } from "react-router-dom";

const TierRowEntry = ({ charID, charName, charImage }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [showName, setShowName] = useState(false);
  return (
    <Link to={`/characters/${charID}/home`}>
      <div
        className="relative flex items-center justify-center overflow-visible"
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
      >
        {
          <div
            className={`absolute z-10 rounded-md border border-black bg-content p-1 text-center ${
              showName ? "inline" : "hidden"
            }`}
          >
            {charName}
          </div>
        }
        <div
          className={`h-[102px] w-[66px] animate-pulse rounded-md bg-gray-300 ${
            imgLoading ? "inline" : "hidden"
          }`}
        />
        <img
          className={`${imgLoading ? "hidden" : "inline"}`}
          src={charImage}
          onLoad={() => setImgLoading(false)}
        />
      </div>
    </Link>
  );
};

export default TierRowEntry;
