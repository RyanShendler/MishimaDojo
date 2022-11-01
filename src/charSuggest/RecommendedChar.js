import { useState } from "react";
import { Link } from "react-router-dom";

const RecommendedChar = ({ charImage, charID, charName, similarity }) => {
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-2/3 flex-row justify-evenly rounded-md border border-black bg-[#EDF0F5] p-2 shadow-md">
        <div className="flex flex-row items-center">
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
          <h5 className="ml-4 text-center text-lg">{`${charName} is a ${(
            similarity * 100
          ).toFixed(2)}% match with your playstyle`}</h5>
        </div>
        <div className="flex flex-col items-center justify-evenly">
          <Link
            className="rounded-md border border-black p-1 shadow-md hover:bg-[#F7F8FA]"
            to={`/characters/${charID}/home`}
          >
            View Character
          </Link>
          <button
            className="rounded-md border border-black p-1 shadow-md hover:bg-[#F7F8FA]"
            onClick={() => window.location.reload()}
          >
            Find Different Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedChar;
