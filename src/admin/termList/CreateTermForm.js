import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_TERM } from "../../mutations/CREATE_TERM";
import { GET_TERM_LIST } from "../../queries/GET_TERM_LIST";

const CreateTermForm = ({ destroyForm }) => {
  const [createTerm] = useMutation(CREATE_TERM, {
    refetchQueries: [GET_TERM_LIST],
    ignoreResults: true,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="p-2">
      <form
        className="flex flex-row items-center justify-between space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          createTerm({
            variables: {
              input: [
                {
                  name: name,
                  description: description,
                },
              ],
            },
          });
          destroyForm();
        }}
      >
        <div className="flex flex-col justify-center p-2">
          <label>
            Enter Name
            <br />
            <input
              className="w-full rounded-md p-1 shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Enter Description
            <br />
            <textarea
              className="w-full rounded-md p-1 shadow-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <input
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer hover:bg-green-500"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CreateTermForm;
