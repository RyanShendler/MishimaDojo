import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DELETE_STANCE } from "../../mutations/DELETE_STANCE";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";
import { GET_STANCELIST } from "../../queries/GET_STANCELIST";
import DeleteStancePopup from "./DeleteStancePopup";

const CharStanceEntry = ({ charID, stanceID, stanceName, stanceNotation }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="flex flex-row shadow-md">
      <div className="flex w-3/4 flex-col items-center justify-center rounded-l-sm border border-black bg-[#EDF0F5] p-1">
        <h2 className="text-center text-xl font-bold">{`${stanceName} (${stanceNotation})`}</h2>
      </div>
      {showPopup && (
        <DeleteStancePopup
          destroyPopup={() => setShowPopup(false)}
          stanceID={stanceID}
          stanceName={stanceName}
        />
      )}
      <div className="flex w-1/4 flex-col items-center justify-evenly space-y-2 rounded-r-md border-y border-r border-black bg-header py-2">
        <Link to={`/admin/characters/${charID}/stances/${stanceID}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-[3rem] cursor-pointer fill-[#CBD5E1] hover:fill-[#F7F8FA]"
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
          className="max-w-[3rem] cursor-pointer fill-[#CBD5E1] hover:fill-[#F7F8FA]"
          onClick={() => setShowPopup(true)}
        >
          <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
        </svg>
      </div>
    </div>
  );
};

export default CharStanceEntry;
