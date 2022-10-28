import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CHARACTER } from "../../mutations/CREATE_CHARACTER";
import { GET_CHAR_LIST } from "../../queries/GET_CHAR_LIST";

const CreateCharForm = ({ destroyForm }) => {
  const [name, setName] = useState("");
  const [createCharacter] = useMutation(CREATE_CHARACTER, {
    refetchQueries: [GET_CHAR_LIST],
    ignoreResults: true,
  });

  return (
    <div className="p-2">
      <form
        className="flex flex-row items-end justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          createCharacter({
            variables: {
              input: [
                {
                  name: name,
                  imageURL: "assets/placeholder.png",
                  summary: "",
                  poke: 1,
                  keepout: 1,
                  mixup: 1,
                  pressure: 1,
                  defense: 1,
                  whiffPunish: 1,
                  strengths: [],
                  weaknesses: [],
                },
              ],
            },
          });
          destroyForm();
        }}
      >
        <label className="">
          Enter Name
          <br />
          <input
            className="rounded-md p-1 shadow-md"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <input
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CreateCharForm;
