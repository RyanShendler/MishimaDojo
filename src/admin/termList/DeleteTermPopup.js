import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TERM } from "../../mutations/DELETE_TERM";
import { GET_TERM_LIST } from "../../queries/GET_TERM_LIST";

const DeleteTermPopup = ({ termID, termName, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const [deleteTerm] = useMutation(DELETE_TERM, {
    refetchQueries: [GET_TERM_LIST],
    ignoreResults: true,
  });

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="p-2 text-xl">
          Are You Sure You Want to Delete {termName}?
        </h2>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white hover:bg-green-500"
            onClick={() => {
              deleteTerm({
                variables: {
                  where: {
                    id: termID,
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

export default DeleteTermPopup;
