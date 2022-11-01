import { createPortal } from "react-dom";
import { useMutation } from "@apollo/client";
import { DELETE_COMBO } from "../../mutations/DELETE_COMBO";
import { GET_COMBOLIST } from "../../queries/GET_COMBOLIST";
import { useEffect, useRef } from "react";
import { GET_CHAR_COMBO } from "../../queries/GET_CHAR_COMBO";

const DeleteComboPopup = ({ comboName, comboID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const [deleteCombo] = useMutation(DELETE_COMBO, {
    refetchQueries: [GET_COMBOLIST, GET_CHAR_COMBO],
    ignoreResults: true,
  });

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="p-2 text-xl">
          Are You Sure You Want to Delete {comboName}?
        </h2>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white hover:bg-green-500"
            onClick={() => {
              deleteCombo({
                variables: {
                  comboId: comboID,
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

export default DeleteComboPopup;
