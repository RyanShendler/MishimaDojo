import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SET_COMBO_HEADER } from "../../mutations/SET_COMBO_HEADER";
import { GET_COMBOLIST } from "../../queries/GET_COMBOLIST";
import { GET_COMBO_HEADER } from "../../queries/GET_COMBO_HEADER";

const ComboHeaderText = ({ comboID, comboName }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(comboName);
  const [setHeader] = useMutation(SET_COMBO_HEADER, {
    refetchQueries: [GET_COMBO_HEADER, GET_COMBOLIST],
    ignoreResults: true,
  });

  return (
    <div>
      {editing ? (
        <div className="flex w-full justify-center space-x-2 bg-header py-2">
          <input
            className="text-lg"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[2rem] cursor-pointer fill-green-600"
            onClick={() => {
              setHeader({
                variables: {
                  where: {
                    id: comboID,
                  },
                  update: {
                    name: name,
                  },
                },
              });
              setEditing(false);
            }}
          >
            <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[2rem] cursor-pointer fill-red-600"
            onClick={() => {
              setName(comboName);
              setEditing(false);
            }}
          >
            <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
          </svg>
        </div>
      ) : (
        <div className="flex w-full justify-center space-x-2 bg-header py-2">
          <h2 className="text-4xl text-[#F1F5F9]">{comboName}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="max-w-[2.75rem] cursor-pointer fill-[#F1F5F9]"
            onClick={() => setEditing(true)}
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ComboHeaderText;
