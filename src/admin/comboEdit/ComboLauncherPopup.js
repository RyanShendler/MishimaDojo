import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ADD_COMBO_LAUNCHER } from "../../mutations/ADD_COMBO_LAUNCHER";
import { GET_CHAR_COMBO } from "../../queries/GET_CHAR_COMBO";
import { GET_COMBO_LAUNCHERS } from "../../queries/GET_COMBO_LAUNCHERS";
import { GET_NEW_LAUNCHERS } from "../../queries/GET_NEW_LAUNCHERS";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";

const ComboLauncherPopup = ({ comboID, charID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_NEW_LAUNCHERS, {
    variables: {
      where: {
        id: charID,
      },
      movesWhere2: {
        launcherFor_NONE: {
          id: comboID,
        },
      },
    },
  });
  const [addLauncher] = useMutation(ADD_COMBO_LAUNCHER, {
    refetchQueries: [GET_NEW_LAUNCHERS, GET_COMBO_LAUNCHERS, GET_CHAR_COMBO],
    ignoreResults: true,
  });
  const [launcherID, setLauncherID] = useState("");
  const [type, setType] = useState("");

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
          <h2 className="text-xl">Select a Launcher</h2>
          <label>
            Launcher
            <select
              className="ml-1"
              value={launcherID}
              onChange={(e) => setLauncherID(e.target.value)}
            >
              <option value={""} />
              {data.characters[0].moves.map((move) => {
                return (
                  <option key={move.id} value={move.id}>
                    {move.input}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Type
            <select
              className="ml-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={""} />
              <option value={"Normal Hit"}>Normal Hit</option>
              <option value={"Counter Hit"}>Counter Hit</option>
              <option value={"Special Linker"}>Special Linker</option>
            </select>
          </label>
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white"
              onClick={() => {
                if (launcherID && type) {
                  addLauncher({
                    variables: {
                      where: {
                        id: comboID,
                      },
                      connect: {
                        launchers: [
                          {
                            where: {
                              node: {
                                id: launcherID,
                              },
                            },
                            connect: [
                              {
                                tags: [
                                  {
                                    where: {
                                      node: {
                                        tag: "Launcher",
                                        value: type,
                                      },
                                    },
                                  },
                                ],
                              },
                            ],
                            edge: {
                              type: type,
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

export default ComboLauncherPopup;
