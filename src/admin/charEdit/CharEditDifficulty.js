import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { SET_CHAR_DIFFICULTY } from "../../mutations/SET_CHAR_DIFFICULTY";
import { GET_ALL_DIFFICULTIES } from "../../queries/GET_ALL_DIFFICULTIES";
import { GET_CHAR_DIFFICULTY } from "../../queries/GET_CHAR_DIFFICULTY";
import { DELETE_CHAR_DIFFICULTY } from "../../mutations/DELETE_CHAR_DIFFICULTY";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import { GET_CHAR_HEADER } from "../../queries/GET_CHAR_HEADER";

//charTier is an object with keys id and value
const CharEditDifficulty = ({ charID, charDifficulty }) => {
  const [editing, setEditing] = useState(false);
  const [difficultyID, setDifficultyID] = useState(charDifficulty.id);
  const { data, loading, error } = useQuery(GET_ALL_DIFFICULTIES, {
    variables: {
      where: {
        tag: "Difficulty",
      },
    },
  });
  const [editDifficulty] = useMutation(SET_CHAR_DIFFICULTY, {
    refetchQueries: [GET_CHAR_DIFFICULTY, GET_CHAR_HEADER],
    ignoreResults: true,
  });
  const [deleteDifficulty] = useMutation(DELETE_CHAR_DIFFICULTY, {
    refetchQueries: [GET_CHAR_DIFFICULTY, GET_CHAR_HEADER],
    ignoreResults: true,
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : editing ? (
        <div className="flex">
          <select
            className="w-full pr-1"
            value={difficultyID}
            onChange={(e) => setDifficultyID(e.target.value)}
          >
            <option value={""}>Unrated</option>
            {data.characterTags.map((difficulty) => {
              return (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.value}
                </option>
              );
            })}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[1.5rem] cursor-pointer fill-green-700"
            onClick={() => {
              if (difficultyID) {
                editDifficulty({
                  variables: {
                    charId: charID,
                    tagId: difficultyID,
                    tag: "Difficulty",
                  },
                });
              } else {
                deleteDifficulty({
                  variables: {
                    where: {
                      id: charID,
                    },
                    disconnect: {
                      tags: [
                        {
                          where: {
                            node: {
                              id: charDifficulty.id,
                            },
                          },
                        },
                      ],
                    },
                  },
                });
              }
              setEditing(false);
            }}
          >
            <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[1.5rem] cursor-pointer fill-red-700"
            onClick={() => {
              setDifficultyID(charDifficulty.id);
              setEditing(false);
            }}
          >
            <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
          </svg>
        </div>
      ) : (
        <div className="flex">
          <h6 className="w-full pr-1">{charDifficulty.value}</h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="max-w-[1.5rem] cursor-pointer fill-black"
            onClick={() => setEditing(true)}
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CharEditDifficulty;
