import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_COMBO } from "../../mutations/CREATE_COMBO";
import { GET_CHAR_COMBO } from "../../queries/GET_CHAR_COMBO";
import { GET_COMBOLIST } from "../../queries/GET_COMBOLIST";

const CreateComboForm = ({ charID, destroyForm }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [createCombo] = useMutation(CREATE_COMBO, {
    refetchQueries: [GET_COMBOLIST, GET_CHAR_COMBO],
    ignoreResults: true,
  });

  return (
    <div className="p-2">
      <form
        className="flex flex-row items-end justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          createCombo({
            variables: {
              charId: charID,
              name: name,
              type: "Launcher",
              input: "Launcher",
              tagType: type,
              tagName: "Type",
            },
          });
          destroyForm();
        }}
      >
        <div className="flex flex-col justify-center space-y-1">
          <label>
            Enter Combo Name
            <br />
            <input
              className="rounded-md p-1 shadow-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Select Combo Type
            <br />
            <select
              className="rounded-md p-1 shadow-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={""} />
              <option value={"Full Combo"}>Full Combo</option>
              <option value={"Mini-Combo"}>Mini-Combo</option>
              <option value={"Wall Combo"}>Wall Combo</option>
            </select>
          </label>
        </div>
        <input
          type="submit"
          value="Submit"
          disabled={!type}
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer disabled:bg-green-800"
        />
      </form>
    </div>
  );
};

export default CreateComboForm;
