import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DELETE_CHARACTER } from "../mutations/DELETE_CHARACTER";
import { GET_CHAR_LIST } from "../queries/GET_CHAR_LIST";
import { useMutation } from "@apollo/client";

const DeleteCharPopup = ({ charName, charID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);

  const [deleteCharacter] = useMutation(DELETE_CHARACTER, {
    refetchQueries: [GET_CHAR_LIST],
    ignoreResults: true,
  });

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="p-2 text-xl">
          Are You Sure You Want to Delete {charName}?
        </h2>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              deleteCharacter({
                variables: {
                  where: {
                    id: charID,
                  },
                },
              });
              destroyPopup();
            }}
          >
            Yes
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
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

export default DeleteCharPopup;
