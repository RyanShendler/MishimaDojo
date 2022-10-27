import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GET_NEW_PLAYSTYLES } from "../../queries/GET_NEW_PLAYSTYLES";
import { ADD_CHAR_PLAYSTYLE } from "../../mutations/ADD_CHAR_PLAYSTYLE";
import { GET_CHAR_PLAYSTYLE } from "../../queries/GET_CHAR_PLAYSTYLE";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";
import { GET_CHAR_HEADER } from "../../queries/GET_CHAR_HEADER";

const CreatePlaystylePopup = ({ charID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_NEW_PLAYSTYLES, {
    variables: {
      where: {
        tag: "Playstyle",
        characters_NONE: {
          id: charID,
        },
      },
    },
  });
  const [addPlaystyle] = useMutation(ADD_CHAR_PLAYSTYLE, {
    refetchQueries: [GET_CHAR_PLAYSTYLE, GET_NEW_PLAYSTYLES, GET_CHAR_HEADER],
    ignoreResults: true,
  });
  const [playstyle, setPlaystyle] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="absolute flex flex-col items-center space-y-2 rounded-md bg-gray-200 p-2 shadow-lg">
          <h2 className="text-xl">Select a Playstyle</h2>
          <select
            className="min-w-[60%]"
            value={playstyle}
            onChange={(e) => setPlaystyle(e.target.value)}
          >
            <option value={""} />
            {data.characterTags.map((playstyle) => {
              return (
                <option key={playstyle.id} value={playstyle.id}>
                  {playstyle.value}
                </option>
              );
            })}
          </select>
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white"
              onClick={() => {
                if (playstyle) {
                  addPlaystyle({
                    variables: {
                      where: {
                        id: charID,
                      },
                      connect: {
                        tags: [
                          {
                            where: {
                              node: {
                                id: playstyle,
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

export default CreatePlaystylePopup;
