import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_STANCE } from "../../mutations/CREATE_STANCE";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";
import { GET_STANCELIST } from "../../queries/GET_STANCELIST";

const CreateStanceForm = ({ charID, destroyForm }) => {
  const [name, setName] = useState("");
  const [notation, setNotation] = useState("");
  const [createStance] = useMutation(CREATE_STANCE, {
    refetchQueries: [GET_STANCELIST, GET_CHAR_STANCES],
    ignoreResults: true,
  });

  return (
    <div className="p-2">
      <form
        className="flex flex-row items-center justify-between space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          createStance({
            variables: {
              input: [
                {
                  name: name,
                  notation: notation,
                  summary: "",
                  transitions: [],
                  users: {
                    connect: [
                      {
                        where: {
                          node: {
                            id: charID,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          });
          destroyForm();
        }}
      >
        <div className="flex flex-col justify-center p-2">
          <label>
            Enter Stance Name
            <br />
            <input
              className="rounded-md bg-white p-1 shadow-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Enter Stance Notation
            <br />
            <input
              className="rounded-md bg-white p-1 shadow-md"
              type="text"
              value={notation}
              onChange={(e) => setNotation(e.target.value)}
            />
          </label>
        </div>
        <input
          type="submit"
          value="Submit"
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateStanceForm;
