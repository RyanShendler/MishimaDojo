import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteCharPopup from "./DeleteCharPopup";

const CharListEntry = ({ charID = "", charName = "", charImage = "" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const destroyPopup = () => setShowPopup(false);

  return (
    <div className="flex flex-row shadow-md">
      {showPopup && (
        <DeleteCharPopup
          destroyPopup={destroyPopup}
          charID={charID}
          charName={charName}
        />
      )}
      <div className="grid w-3/4 grid-cols-2 rounded-l-sm border border-black bg-[#EDF0F5] p-1">
        <img className="shrink" src={charImage} alt="Character Image" />
        <div className="flex items-center justify-center">
          <h2 className="whitespace-pre-wrap text-center text-xl">
            {charName}
          </h2>
        </div>
      </div>
      <div className="flex w-1/4 flex-col items-center justify-evenly rounded-r-md border-y border-r border-black bg-header">
        <Link className="" to={`/admin/characters/${charID}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-[2.75rem] cursor-pointer fill-[#CBD5E1]"
            viewBox="0 0 48 48"
            width="100%"
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className="max-w-[2.75rem] cursor-pointer fill-[#CBD5E1]"
          onClick={() => setShowPopup(true)}
        >
          <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
        </svg>
      </div>
    </div>
  );
};

export default CharListEntry;
