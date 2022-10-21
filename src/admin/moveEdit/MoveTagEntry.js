import { useMutation } from "@apollo/client";
import { REMOVE_MOVE_TAG } from "../../mutations/REMOVE_MOVE_TAG";
import { GET_MOVE_TAGS } from "../../queries/GET_MOVE_TAGS";
import { GET_NEW_MOVE_TAGS } from "../../queries/GET_NEW_MOVE_TAGS";
import { GET_PUNISHERS } from "../../queries/GET_PUNISHERS";

const MoveTagEntry = ({ moveID, tagID, tagName, tagValue }) => {
  const [removeTag] = useMutation(REMOVE_MOVE_TAG, {
    refetchQueries: [GET_MOVE_TAGS, GET_NEW_MOVE_TAGS, GET_PUNISHERS],
    ignoreResults: true,
  });

  return (
    <div className="flex space-x-1 rounded-md border border-black p-1 px-1 shadow-md">
      <div className="flex flex-col items-center justify-center">
        <h6 className="font-bold">{tagName}</h6>
        <h6>{tagValue}</h6>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="100%"
        className="max-w-[1.75rem] cursor-pointer fill-red-700"
        onClick={() =>
          removeTag({
            variables: {
              where: {
                id: moveID,
              },
              disconnect: {
                tags: [
                  {
                    where: {
                      node: {
                        id: tagID,
                      },
                    },
                  },
                ],
              },
            },
          })
        }
      >
        <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
      </svg>
    </div>
  );
};

export default MoveTagEntry;
