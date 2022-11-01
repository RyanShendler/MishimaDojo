import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHAR_TAG } from "../../mutations/CREATE_CHAR_TAG";
import { CREATE_MOVE_TAG } from "../../mutations/CREATE_MOVE_TAG";
import { CREATE_COMBO_TAG } from "../../mutations/CREATE_COMBO_TAG";
import { GET_TAG_LIST } from "../../queries/GET_TAG_LIST";
import { GET_ALL_TIERS } from "../../queries/GET_ALL_TIERS";
import { GET_ALL_DIFFICULTIES } from "../../queries/GET_ALL_DIFFICULTIES";
import { GET_NEW_PLAYSTYLES } from "../../queries/GET_NEW_PLAYSTYLES";
import { GET_NEW_MOVE_TAGS } from "../../queries/GET_NEW_MOVE_TAGS";
import { GET_NEW_COMBO_TAGS } from "../../queries/GET_NEW_COMBO_TAGS";
import { GET_ALL_PLAYSTYLES } from "../../queries/GET_ALL_PLAYSTYLES";
import { GET_ALL_MOVE_TAGS } from "../../queries/GET_ALL_MOVE_TAGS";

const TAG_TYPES = ["Character Tag", "Move Tag", "Combo Tag"];
const CreateTagForm = ({ destroyForm }) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const [createCharTag] = useMutation(CREATE_CHAR_TAG, {
    refetchQueries: [
      GET_TAG_LIST,
      GET_ALL_TIERS,
      GET_ALL_DIFFICULTIES,
      GET_NEW_PLAYSTYLES,
      GET_ALL_PLAYSTYLES,
    ],
    ignoreResults: true,
  });
  const [createMoveTag] = useMutation(CREATE_MOVE_TAG, {
    refetchQueries: [GET_TAG_LIST, GET_NEW_MOVE_TAGS, GET_ALL_MOVE_TAGS],
    ignoreResults: true,
  });
  const [createComboTag] = useMutation(CREATE_COMBO_TAG, {
    refetchQueries: [GET_TAG_LIST, GET_NEW_COMBO_TAGS],
    ignoreResults: true,
  });

  const createTag = () => {
    const variables = {
      variables: {
        input: [
          {
            tag: name,
            value: value,
          },
        ],
      },
    };
    switch (type) {
      case "Character Tag":
        createCharTag(variables);
        break;
      case "Move Tag":
        createMoveTag(variables);
        break;
      case "Combo Tag":
        createComboTag(variables);
        break;
    }
  };

  return (
    <div className="p-2">
      <form
        className="flex flex-row items-center justify-between space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          createTag();
          destroyForm();
        }}
      >
        <div className="flex flex-col justify-center p-2">
          <label>
            Select Tag Type <br />
            <select
              className="w-full rounded-md p-1 shadow-md"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option />
              {TAG_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Enter Tag Name <br />
            <input
              className="rounded-md bg-white p-1 shadow-md disabled:bg-slate-100"
              type="text"
              value={name}
              disabled={!type}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label>
            Enter Tag Value <br />
            <input
              className="rounded-md bg-white p-1 shadow-md disabled:bg-slate-100"
              type="text"
              value={value}
              disabled={!type}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </label>
        </div>
        <input
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer hover:bg-green-500 disabled:bg-green-800"
          type="submit"
          value="Submit"
          disabled={!type}
        />
      </form>
    </div>
  );
};

export default CreateTagForm;
