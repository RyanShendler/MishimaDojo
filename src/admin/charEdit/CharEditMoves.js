import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharMoveRow from "./CharMoveRow";
import CreateMoveForm from "./CreateMoveForm";

const CharEditMoves = ({ charID }) => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => setShowForm(false);
  const { data, loading, error } = useQuery(GET_MOVELIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="flex w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Movelist</h1>
        {showForm ? (
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white hover:bg-red-500"
            onClick={() => destroyForm()}
          >
            Cancel
          </button>
        ) : (
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white hover:bg-green-500"
            onClick={() => setShowForm(true)}
          >
            Create
          </button>
        )}
      </div>
      {showForm && <CreateMoveForm charID={charID} destroyForm={destroyForm} />}
      <div className="flex items-center justify-center p-2">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characters.length ? (
          <h3>Character Not Found</h3>
        ) : (
          <table className="w-full table-fixed border-collapse border border-black text-center">
            <tbody className="">
              <tr className="border border-black">
                <th className="w-[30%] border border-black">Name</th>
                <th className="w-[30%] border border-black">Input</th>
                <th className="border border-black"></th>
                <th className="border border-black"></th>
              </tr>
              {!data.characters[0].moves.length ? (
                <CharMoveRow />
              ) : (
                data.characters[0].moves.map((move) => {
                  return (
                    <CharMoveRow
                      key={move.id}
                      moveID={move.id}
                      moveName={move.name}
                      moveInput={move.input}
                      charID={charID}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CharEditMoves;
