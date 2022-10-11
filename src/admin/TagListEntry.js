import { useState } from "react";
import DeleteTagPopup from "./DeleteTagPopup";
import { EDIT_CHAR_TAG } from "../mutations/EDIT_CHAR_TAG";
import { EDIT_COMBO_TAG } from "../mutations/EDIT_COMBO_TAG";
import { EDIT_MOVE_TAG } from "../mutations/EDIT_MOVE_TAG";
import { useMutation } from "@apollo/client";
import { GET_TAG_LIST } from "../queries/GET_TAG_LIST";

const TagListEntry = ({
  tagID = "",
  tagName = "",
  tagValue = "",
  tagType = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [showTagPopup, setShowTagPopup] = useState(false);
  const destroyPopup = () => setShowTagPopup(false);

  const [name, setName] = useState(tagName);
  const [value, setValue] = useState(tagValue);

  const [editCharTag] = useMutation(EDIT_CHAR_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });
  const [editMoveTag] = useMutation(EDIT_MOVE_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });
  const [editComboTag] = useMutation(EDIT_COMBO_TAG, {
    refetchQueries: [GET_TAG_LIST],
    ignoreResults: true,
  });
  const editTag = () => {
    const variables = {
      variables: {
        where: {
          id: tagID,
        },
        update: {
          tag: name,
          value: value,
        },
      },
    };
    switch (tagType) {
      case "characterTags":
        editCharTag(variables);
        break;
      case "comboTags":
        editComboTag(variables);
        break;
      case "moveTags":
        editMoveTag(variables);
        break;
    }
  };

  return (
    <div className="flex w-full flex-row justify-between space-x-4 rounded-md border border-black p-2 shadow-md">
      {showTagPopup && (
        <DeleteTagPopup
          destroyPopup={destroyPopup}
          tagID={tagID}
          tagName={tagName}
          tagValue={tagValue}
          tagType={tagType}
        />
      )}
      <div className="flex flex-col items-start justify-evenly">
        <h3 className="text-lg font-bold">
          {
            {
              characterTags: "Character Tag",
              comboTags: "Combo Tag",
              moveTags: "Move Tag",
            }[tagType]
          }
        </h3>
        {editing ? (
          <div className="flex flex-col items-start justify-evenly space-y-1">
            <input
              className="rounded-md bg-white p-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="rounded-md bg-white p-1"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-evenly space-y-1">
            <h5>{tagName}</h5>
            <h5>{tagValue}</h5>
          </div>
        )}
      </div>
      {editing ? (
        <div className="flex flex-col items-center justify-center space-y-1">
          <button
            className="rounded-md bg-green-600 p-1 text-white"
            onClick={() => {
              editTag();
              setEditing(false);
            }}
          >
            Save Changes
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-white"
            onClick={() => {
              setName(tagName);
              setValue(tagValue);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-1">
          <button
            className="rounded-md bg-green-600 p-1 text-white"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="rounded-md bg-red-600 p-1 text-white"
            onClick={() => setShowTagPopup(true)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TagListEntry;
