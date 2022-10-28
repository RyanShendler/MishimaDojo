import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_STANCE_MOVE } from "../../mutations/REMOVE_STANCE_MOVE";
import { GET_CHAR_STANCES } from "../../queries/GET_CHAR_STANCES";
import { GET_NONSTANCE_MOVES } from "../../queries/GET_NONSTANCE_MOVES";
import { GET_STANCELESS } from "../../queries/GET_STANCELESS";
import { GET_STANCE_MOVES } from "../../queries/GET_STANCE_MOVES";

const StanceMoveEntry = ({ charID, moveID, stanceID, moveName, moveInput }) => {
  const [removeMove] = useMutation(REMOVE_STANCE_MOVE, {
    refetchQueries: [
      GET_STANCE_MOVES,
      GET_NONSTANCE_MOVES,
      GET_STANCELESS,
      GET_CHAR_STANCES,
    ],
    ignoreResults: true,
  });

  return (
    <div className="flex flex-row shadow-md">
      <div className="flex w-3/4 flex-col items-center justify-center rounded-l-sm border border-black bg-[#EDF0F5] p-1">
        <h3 className="text-center text-lg font-bold">{moveName}</h3>
        <h5>{moveInput}</h5>
      </div>
      <div className="flex w-1/4 flex-col items-center justify-evenly space-y-1 rounded-r-md border-y border-r border-black bg-header p-1">
        <Link to={`/admin/characters/${charID}/moves/${moveID}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 48 48"
            className="max-w-[1.75rem] cursor-pointer fill-[#CBD5E1]"
          >
            <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
          </svg>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[1.75rem] cursor-pointer fill-[#CBD5E1]"
          viewBox="0 0 48 48"
          width="100%"
          onClick={() => {
            removeMove({
              variables: {
                where: {
                  id: stanceID,
                },
                disconnect: {
                  moves: [
                    {
                      where: {
                        node: {
                          id: moveID,
                        },
                      },
                    },
                  ],
                },
              },
            });
          }}
        >
          <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
        </svg>
      </div>
    </div>
  );
};

export default StanceMoveEntry;
