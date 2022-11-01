import { useMutation } from "@apollo/client";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DELETE_MOVE } from "../../mutations/DELETE_MOVE";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";
import { GET_COMBO_LAUNCHERS } from "../../queries/GET_COMBO_LAUNCHERS";
import { GET_FULL_MOVELIST } from "../../queries/GET_FULL_MOVELIST";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import { GET_NEW_LAUNCHERS } from "../../queries/GET_NEW_LAUNCHERS";
import { GET_NONSTANCE_MOVES } from "../../queries/GET_NONSTANCE_MOVES";
import { GET_PUNISHERS } from "../../queries/GET_PUNISHERS";
import { GET_STANCE_MOVES } from "../../queries/GET_STANCE_MOVES";

const DeleteMovePopup = ({ moveID, moveName, destroyPopup }) => {
  const [deleteMove] = useMutation(DELETE_MOVE, {
    refetchQueries: [
      GET_MOVELIST,
      GET_NONSTANCE_MOVES,
      GET_STANCE_MOVES,
      GET_COMBO_LAUNCHERS,
      GET_NEW_LAUNCHERS,
      GET_PUNISHERS,
      GET_FULL_MOVELIST,
      GET_CHAR_STANCES,
    ],
    ignoreResults: true,
  });
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="p-2 text-xl">
          Are You Sure You Want to Delete {moveName}?
        </h2>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white hover:bg-green-500"
            onClick={() => {
              deleteMove({
                variables: {
                  where: {
                    id: moveID,
                  },
                },
              });
              destroyPopup();
            }}
          >
            Yes
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white hover:bg-red-500"
            onClick={() => destroyPopup()}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    elRef.current
  );
};

export default DeleteMovePopup;
