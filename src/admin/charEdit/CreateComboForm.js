import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_COMBO } from "../../mutations/CREATE_COMBO";
import { GET_COMBOLIST } from "../../queries/GET_COMBOLIST";

const CreateComboForm = ({ charID, destroyForm }) => {
  const [name, setName] = useState("");
  const [createCombo] = useMutation(CREATE_COMBO, {
    refetchQueries: [GET_COMBOLIST],
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
            },
          });
          destroyForm();
        }}
      >
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
        <input
          type="submit"
          value="Submit"
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateComboForm;
