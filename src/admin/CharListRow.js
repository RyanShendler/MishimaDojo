import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteCharPopup from "./DeleteCharPopup";
import { GET_CHAR_LIST } from "../queries/GET_CHAR_LIST";
import { DELETE_CHARACTER } from "../mutations/DELETE_CHARACTER";

const CharListRow = ({ charID = "", charName = "", charTimestamp = "" }) => {
  const [showCharPopup, setShowCharPopup] = useState(false);
  const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
    refetchQueries: [GET_CHAR_LIST],
    ignoreResults: true,
  });
  const destroyPopup = () => setShowCharPopup(false);

  return (
    <tr>
      {showCharPopup && (
        <DeleteCharPopup
          destroyPopup={destroyPopup}
          charID={charID}
          charName={charName}
        />
      )}
      <td className="char-list-entry">{charID}</td>
      <td className="char-list-entry">{charName}</td>
      <td className="char-list-entry">{charTimestamp}</td>
      <td className="char-list-entry">
        {charID && (
          <Link
            to={`/admin/characters/${charID}`}
            className="rounded-md bg-green-600 p-1 text-white"
          >
            Edit
          </Link>
        )}
      </td>
      <td className="char-list-entry">
        {charID && (
          <button
            className="rounded-md bg-red-600 p-1 text-white"
            onClick={() => setShowCharPopup(true)}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default CharListRow;
