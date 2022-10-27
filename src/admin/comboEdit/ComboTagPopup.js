import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMBO_TAG } from "../../mutations/ADD_COMBO_TAG";
import { GET_COMBO_TAGS } from "../../queries/GET_COMBO_TAGS";
import { GET_NEW_COMBO_TAGS } from "../../queries/GET_NEW_COMBO_TAGS";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";
import { GET_CHAR_COMBO } from "../../queries/GET_CHAR_COMBO";

const ComboTagPopup = ({ comboID, destroyPopup }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);
  const { data, loading, error } = useQuery(GET_NEW_COMBO_TAGS, {
    variables: {
      where: {
        combos_NONE: {
          id: comboID,
        },
      },
    },
  });
  const [addTag] = useMutation(ADD_COMBO_TAG, {
    refetchQueries: [GET_COMBO_TAGS, GET_NEW_COMBO_TAGS, GET_CHAR_COMBO],
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
            {data.comboTags.map((tag) => {
              return (
                <option value={tag.id}>{`${tag.tag} (${tag.value})`}</option>
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
                        id: comboID,
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

export default ComboTagPopup;
