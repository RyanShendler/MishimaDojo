import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_STANCE_TRANSITIONS } from "../../mutations/SET_STANCE_TRANSITIONS";
import { GET_STANCE_TRANSITIONS } from "../../queries/GET_STANCE_TRANSITIONS";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";

const StanceTransitionPopup = ({ stanceID, destroyPopup, allTransitions }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const [transition, setTransition] = useState("");
  const [addTransition] = useMutation(SET_STANCE_TRANSITIONS, {
    refetchQueries: [GET_STANCE_TRANSITIONS, GET_CHAR_STANCES],
    ignoreResults: true,
  });

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center space-y-2 rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="text-xl">Add a Transition</h2>
        <input
          className="p-1"
          type="text"
          value={transition}
          onChange={(e) => setTransition(e.target.value)}
        />
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              const newTransitions = allTransitions.concat([transition]);
              addTransition({
                variables: {
                  where: {
                    id: stanceID,
                  },
                  update: {
                    transitions: newTransitions,
                  },
                },
              });
              destroyPopup();
            }}
          >
            Save Changes
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
            onClick={() => destroyPopup()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    elRef.current
  );
};

export default StanceTransitionPopup;
