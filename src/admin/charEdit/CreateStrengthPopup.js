import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EDIT_CHAR_STRENGTHS } from "../../mutations/EDIT_CHAR_STRENGTHS";
import { GET_CHAR_HOME } from "../../queries/GET_CHAR_HOME";
import { GET_CHAR_STRENGTHS } from "../../queries/GET_CHAR_STRENGTHS";

const CreateStrengthPopup = ({ charID, allStrengths, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const [addStrength] = useMutation(EDIT_CHAR_STRENGTHS, {
    refetchQueries: [GET_CHAR_STRENGTHS, GET_CHAR_HOME],
    ignoreResults: true,
  });
  const [strength, setStrength] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center space-y-2 rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="text-xl">Add a Strength</h2>
        <input
          className="p-1"
          type="text"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
        />
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              const newStrengths = allStrengths.concat([strength]);
              addStrength({
                variables: {
                  where: {
                    id: charID,
                  },
                  update: {
                    strengths: newStrengths,
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

export default CreateStrengthPopup;
