import { useMutation } from "@apollo/client";
import { EDIT_CHAR_STRENGTHS } from "../../mutations/EDIT_CHAR_STRENGTHS";
import { GET_CHAR_HOME } from "../../queries/GET_CHAR_HOME";
import { GET_CHAR_STRENGTHS } from "../../queries/GET_CHAR_STRENGTHS";

const CharStrengthEntry = ({ strength, allStrengths, charID }) => {
  const [removeStrength] = useMutation(EDIT_CHAR_STRENGTHS, {
    refetchQueries: [GET_CHAR_STRENGTHS, GET_CHAR_HOME],
    ignoreResults: true,
  });

  return (
    <li className="">
      <div className="flex">
        <h6 className="pr-1">{strength}</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className="max-w-[1.25rem] cursor-pointer fill-red-700"
          onClick={() => {
            const newStrengths = allStrengths.filter(
              (item) => item !== strength
            );
            removeStrength({
              variables: {
                where: {
                  id: charID,
                },
                update: {
                  strengths: newStrengths,
                },
              },
            });
          }}
        >
          <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
        </svg>
      </div>
    </li>
  );
};

export default CharStrengthEntry;
