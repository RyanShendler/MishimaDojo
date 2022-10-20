import { useMutation, useQuery } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ADD_MOVE_TAG } from "../../mutations/ADD_MOVE_TAG";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import { GET_MOVE_TAGS } from "../../queries/GET_MOVE_TAGS";
import { GET_NEW_MOVE_TAGS } from "../../queries/GET_NEW_MOVE_TAGS";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";

const MoveTagPopup = ({ moveID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_NEW_MOVE_TAGS, {
    variables: {
      where: {
        moves_NONE: {
          id: moveID,
        },
      },
    },
  });
  const [addTag] = useMutation(ADD_MOVE_TAG, {
    refetchQueries: [GET_MOVE_TAGS, GET_NEW_MOVE_TAGS],
    ignoreResults: true,
  });
  const [tagID, setTagID] = useState("");

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="absolute flex flex-col items-center space-y-2 rounded-md bg-gray-200 p-2 shadow-lg">
          <h2 className="text-xl">Select a Tag</h2>
          <select value={tagID} onChange={(e) => setTagID(e.target.value)}>
            <option value={""} />
            {data.moveTags.map((tag) => {
              return (
                <option key={tag.id} value={tag.id}>
                  {`${tag.tag} (${tag.value})`}
                </option>
              );
            })}
          </select>
          <div className="flex items-center justify-evenly space-x-4">
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white"
              onClick={() => {
                if (tagID) {
                  addTag({
                    variables: {
                      where: {
                        id: moveID,
                      },
                      connect: {
                        tags: [
                          {
                            where: {
                              node: {
                                id: tagID,
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

export default MoveTagPopup;
