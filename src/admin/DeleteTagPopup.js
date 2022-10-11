import { useEffect, useRef } from "react";
import { DELETE_CHAR_TAG } from "../mutations/DELETE_CHAR_TAG";
import { DELETE_MOVE_TAG } from "../mutations/DELETE_MOVE_TAG";
import { DELETE_COMBO_TAG } from "../mutations/DELETE_COMBO_TAG";
import { useMutation } from "@apollo/client";
import { GET_TAG_LIST } from "../queries/GET_TAG_LIST";
import { createPortal } from "react-dom";

const DeleteTagPopup = ({
  tagName,
  tagValue,
  tagID,
  tagType,
  destroyPopup,
}) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);

  const [deleteCharTag] = useMutation(DELETE_CHAR_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });
  const [deleteMoveTag] = useMutation(DELETE_MOVE_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });
  const [deleteComboTag] = useMutation(DELETE_COMBO_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });

  const deleteTag = () => {
    const variables = {
      variables: {
        where: {
          id: tagID,
        },
      },
    };
    switch (tagType) {
      case "characterTags":
        deleteCharTag(variables);
        break;
      case "comboTags":
        deleteComboTag(variables);
        break;
      case "moveTags":
        deleteMoveTag(variables);
        break;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex flex-col items-center rounded-md bg-gray-200 p-2 shadow-lg">
        <h2 className="p-2 text-xl">
          Are You Sure You Want to Delete Tag {tagName} with Value {tagValue}?
        </h2>
        <div className="flex items-center justify-evenly space-x-4">
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              deleteTag();
              destroyPopup();
            }}
          >
            Yes
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
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

export default DeleteTagPopup;
