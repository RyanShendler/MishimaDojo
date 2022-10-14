import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_WEAKNESSES } from "../../queries/GET_CHAR_WEAKNESSES";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharWeaknessEntry from "./CharWeaknessEntry";
import CreateWeaknessPopup from "./CreateWeaknessPopup";

const CharEditWeaknesses = ({ charID }) => {
  const { data, loading, error } = useQuery(GET_CHAR_WEAKNESSES, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const [showPopup, setShowPopup] = useState(false);
  const destroyPopup = () => setShowPopup(false);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <ul className="list-disc py-2">
          {showPopup && (
            <CreateWeaknessPopup
              charID={charID}
              allWeaknesses={data.characters[0].weaknesses}
              destroyPopup={destroyPopup}
            />
          )}
          {data.characters[0].weaknesses.map((weakness, index) => {
            return (
              <CharWeaknessEntry
                key={index}
                weakness={weakness}
                allWeaknesses={data.characters[0].weaknesses}
                charID={charID}
              />
            );
          })}
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="100%"
              className="max-w-[1.5rem] cursor-pointer"
              onClick={() => setShowPopup(true)}
            >
              <path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z" />
            </svg>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CharEditWeaknesses;
