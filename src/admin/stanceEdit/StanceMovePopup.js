import { useMutation, useQuery } from "@apollo/client";
import { ADD_STANCE_MOVE } from "../../mutations/ADD_STANCE_MOVE";
import { GET_NONSTANCE_MOVES } from "../../queries/GET_NONSTANCE_MOVES";
import { GET_STANCE_MOVES } from "../../queries/GET_STANCE_MOVES";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";

const StanceMovePopup = ({ charID, stanceID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_NONSTANCE_MOVES, {
    variables: {
      where: {
        id: charID,
      },
      movesWhere2: {
        stances_NONE: {
          id: stanceID,
        },
      },
    },
  });
  const [addMove] = useMutation(ADD_STANCE_MOVE, {
    refetchQueries: [GET_NONSTANCE_MOVES, GET_STANCE_MOVES],
    ignoreResults: true,
  });
  const [moveID, setMoveID] = useState("");

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
          <h2 className="text-xl">Select a Move</h2>
          <select value={moveID} onChange={(e) => setMoveID(e.target.value)}>
            <option value={""} />
            {data.characters[0].moves.map((move) => {
              return (
                <option
                  value={move.id}
                >{`${move.name} (${move.input})`}</option>
              );
            })}
          </select>
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white"
              onClick={() => {
                if (moveID) {
                  addMove({
                    variables: {
                      where: {
                        id: stanceID,
                      },
                      connect: {
                        moves: [
                          {
                            where: {
                              node: {
                                id: moveID,
                              },
                            },
                          },
                        ],
                      },
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

export default StanceMovePopup;
