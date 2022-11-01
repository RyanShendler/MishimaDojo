import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_MOVE } from "../../mutations/CREATE_MOVE";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";
import { GET_FULL_MOVELIST } from "../../queries/GET_FULL_MOVELIST";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import { GET_NEW_LAUNCHERS } from "../../queries/GET_NEW_LAUNCHERS";
import { GET_NONSTANCE_MOVES } from "../../queries/GET_NONSTANCE_MOVES";
import { GET_STANCELESS } from "../../queries/GET_STANCELESS";

const CreateMoveForm = ({ charID, destroyForm }) => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [createMove] = useMutation(CREATE_MOVE, {
    refetchQueries: [
      GET_MOVELIST,
      GET_NONSTANCE_MOVES,
      GET_NEW_LAUNCHERS,
      GET_FULL_MOVELIST,
    ],
    ignoreResults: true,
  });
  return (
    <div className="p-2">
      <form
        className="flex flex-row items-center justify-between space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          createMove({
            variables: {
              input: [
                {
                  name: name,
                  input: input,
                  startup: 10,
                  onHit: "0",
                  onCH: "0",
                  onBlock: "0",
                  summary: "",
                  damageHit: 0,
                  damageCH: 0,
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
            Enter Move Name
            <br />
            <input
              className="rounded-md bg-white p-1 shadow-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Enter Move Input
            <br />
            <input
              className="rounded-md bg-white p-1 shadow-md"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
        </div>
        <input
          className="rounded-md bg-green-600 p-1 text-lg text-white hover:bg-green-500"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default CreateMoveForm;
