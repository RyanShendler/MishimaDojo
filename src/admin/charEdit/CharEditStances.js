import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_STANCELIST } from "../../queries/GET_STANCELIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharStanceEntry from "./CharStanceEntry";
import CreateStanceForm from "./CreateStanceForm";

const CharEditStances = ({ charID }) => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => setShowForm(false);
  const { data, loading, error } = useQuery(GET_STANCELIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Stances</h1>
        {showForm ? (
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
            onClick={() => destroyForm()}
          >
            Cancel
          </button>
        ) : (
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => setShowForm(true)}
          >
            Create
          </button>
        )}
      </div>
      {showForm && (
        <CreateStanceForm charID={charID} destroyForm={destroyForm} />
      )}
      <div className="grid grid-cols-3 gap-4 px-4 pt-2 pb-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !data.characters[0].stances.length ? (
          <h3>No Stances</h3>
        ) : (
          data.characters[0].stances.map((stance) => {
            return (
              <CharStanceEntry
                key={stance.id}
                charID={charID}
                stanceID={stance.id}
                stanceName={stance.name}
                stanceNotation={stance.notation}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CharEditStances;
