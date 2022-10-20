import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import { ADD_COMBO_INPUT } from "../../mutations/ADD_COMBO_INPUT";
import { GET_COMBO_INPUTS } from "../../queries/GET_COMBO_INPUTS";

const ComboInputPopup = ({ comboID, destroyPopup, charID }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_MOVELIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const [addInput] = useMutation(ADD_COMBO_INPUT, {
    refetchQueries: [GET_COMBO_INPUTS],
    ignoreResults: true,
  });
  const [type, setType] = useState("");
  const [input, setInput] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <div className="absolute flex flex-col items-center space-y-2 rounded-md bg-gray-200 p-2 shadow-lg">
          <h2 className="text-xl">Add a Combo Input</h2>
          <label>
            Type
            <select
              className="ml-1"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                if (e.target.value !== "Move" && e.target.value !== "Other") {
                  setInput(e.target.value);
                } else {
                  setInput("");
                }
              }}
            >
              <option value={""} />
              <option value={"Move"}>Move</option>
              <option value={"Dash"}>Dash</option>
              <option value={"Back Dash"}>Back Dash</option>
              <option value={"Microdash"}>Microdash</option>
              <option value={"Sidestep Left"}>Sidestep Left</option>
              <option value={"Sidestep Right"}>Sidestep Right</option>
              <option value={"Other"}>Other</option>
            </select>
          </label>
          {type === "Other" && (
            <label>
              Input
              <input
                className="ml-1 p-1"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
          )}
          {type === "Move" && (
            <label>
              Input
              <select
                className="ml-1"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              >
                <option value={""} />
                {data.characters[0].moves.map((move) => {
                  return (
                    <option key={move.id} value={move.input}>
                      {move.input}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white"
              onClick={() => {
                if (type && input) {
                  const moveID =
                    type === "Move"
                      ? data.characters[0].moves.find((move) => {
                          return move.input === input;
                        }).id
                      : null;
                  addInput({
                    variables: {
                      comboId: comboID,
                      type: type,
                      input: input,
                      moveId: moveID,
                    },
                  });
                }
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
      )}
    </div>,
    elRef.current
  );
};

export default ComboInputPopup;
