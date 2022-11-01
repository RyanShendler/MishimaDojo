import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteMovePopup from "./DeleteMovePopup";

const CharMoveRow = ({
  charID,
  moveID = "",
  moveName = "",
  moveInput = "",
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <tr className="">
      {showPopup && (
        <DeleteMovePopup
          moveID={moveID}
          destroyPopup={() => setShowPopup(false)}
          moveName={moveName}
        />
      )}
      <td className="border border-black">
        <div className="min-h-[1.5rem]">{moveName}</div>
      </td>
      <td className="border border-black">
        <div className="min-h-[1.5rem]">{moveInput}</div>
      </td>
      <td className="border border-black">
        {!moveID ? (
          <div className="min-h-[1.5rem]"></div>
        ) : (
          <div className="min-h-[1.5rem]">
            <Link
              className="text-center text-[#0000EE] hover:underline"
              to={`/admin/characters/${charID}/moves/${moveID}`}
            >
              edit
            </Link>
          </div>
        )}
      </td>
      <td className="border border-black">
        {!moveID ? (
          <div className="min-h-[1.5rem]"></div>
        ) : (
          <div className="min-h-[1.5rem]">
            <button
              className="text-center text-red-600 hover:underline"
              onClick={() => setShowPopup(true)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CharMoveRow;
