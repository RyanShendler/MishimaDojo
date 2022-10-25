import { useState } from "react";
import DeleteTagPopup from "./DeleteTagPopup";
import { EDIT_CHAR_TAG } from "../../mutations/EDIT_CHAR_TAG";
import { EDIT_COMBO_TAG } from "../../mutations/EDIT_COMBO_TAG";
import { EDIT_MOVE_TAG } from "../../mutations/EDIT_MOVE_TAG";
import { useMutation } from "@apollo/client";
import { GET_TAG_LIST } from "../../queries/GET_TAG_LIST";
import { GET_ALL_TIERS } from "../../queries/GET_ALL_TIERS";
import { GET_CHAR_TIER } from "../../queries/GET_CHAR_TIER";
import { GET_CHAR_DIFFICULTY } from "../../queries/GET_CHAR_DIFFICULTY";
import { GET_CHAR_PLAYSTYLE } from "../../queries/GET_CHAR_PLAYSTYLE";
import { GET_ALL_DIFFICULTIES } from "../../queries/GET_ALL_DIFFICULTIES";
import { GET_NEW_PLAYSTYLES } from "../../queries/GET_NEW_PLAYSTYLES";
import { GET_MOVE_TAGS } from "../../queries/GET_MOVE_TAGS";
import { GET_NEW_MOVE_TAGS } from "../../queries/GET_NEW_MOVE_TAGS";
import { GET_COMBO_TAGS } from "../../queries/GET_COMBO_TAGS";
import { GET_NEW_COMBO_TAGS } from "../../queries/GET_NEW_COMBO_TAGS";
import { GET_ALL_PLAYSTYLES } from "../../queries/GET_ALL_PLAYSTYLES";
import { GET_ALL_MOVE_TAGS } from "../../queries/GET_ALL_MOVE_TAGS";

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
    refetchQueries: [
      GET_TAG_LIST,
      GET_ALL_TIERS,
      GET_ALL_DIFFICULTIES,
      GET_NEW_PLAYSTYLES,
      GET_CHAR_TIER,
      GET_CHAR_DIFFICULTY,
      GET_CHAR_PLAYSTYLE,
      GET_ALL_PLAYSTYLES,
    ],
    ignoreResults: true,
  });
  const [editMoveTag] = useMutation(EDIT_MOVE_TAG, {
    refetchQueries: [
      GET_TAG_LIST,
      GET_MOVE_TAGS,
      GET_NEW_MOVE_TAGS,
      GET_ALL_MOVE_TAGS,
    ],
    ignoreResults: true,
  });
  const [editComboTag] = useMutation(EDIT_COMBO_TAG, {
    refetchQueries: [GET_TAG_LIST, GET_COMBO_TAGS, GET_NEW_COMBO_TAGS],
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
    <div className="flex flex-row shadow-md">
      {showTagPopup && (
        <DeleteTagPopup
          destroyPopup={destroyPopup}
          tagID={tagID}
          tagName={tagName}
          tagValue={tagValue}
          tagType={tagType}
        />
      )}
      <div className="flex w-3/4 flex-col items-center justify-center rounded-l-sm border border-black bg-[#EDF0F5] p-1">
        <h3 className="text-center text-lg font-bold">
          {
            {
              characterTags: "Character Tag",
              comboTags: "Combo Tag",
              moveTags: "Move Tag",
            }[tagType]
          }
        </h3>
        {editing ? (
          <div className="flex flex-col items-center justify-evenly space-y-1">
            <input
              className="rounded-md bg-white text-center"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="rounded-md bg-white text-center"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-evenly space-y-1">
            <h5 className="">{tagName}</h5>
            <h5 className="">{tagValue}</h5>
          </div>
        )}
      </div>
      {editing ? (
        <div className="flex w-1/4 flex-col items-center justify-evenly rounded-r-md border-y border-r border-black bg-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" max-w-[2.5rem] cursor-pointer fill-[#CBD5E1]"
            viewBox="0 0 48 48"
            width="100%"
            onClick={() => {
              editTag();
              setEditing(false);
            }}
          >
            <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-[2.5rem] cursor-pointer fill-[#CBD5E1]"
            viewBox="0 0 48 48"
            width="100%"
            onClick={() => {
              setName(tagName);
              setValue(tagValue);
              setEditing(false);
            }}
          >
            <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
          </svg>
        </div>
      ) : (
        <div className="flex w-1/4 flex-col items-center justify-evenly rounded-r-md border-y border-r border-black bg-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-[2.5rem] cursor-pointer fill-[#CBD5E1]"
            viewBox="0 0 48 48"
            width="100%"
            onClick={() => setEditing(true)}
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[2.5rem] cursor-pointer fill-[#CBD5E1]"
            onClick={() => setShowTagPopup(true)}
          >
            <path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TagListEntry;
