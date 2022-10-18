import { useQuery } from "@apollo/client";
import { useState } from "react";
import CreateComboForm from "./CreateComboForm";
import { GET_COMBOLIST } from "../../queries/GET_COMBOLIST";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";
import CharComboEntry from "./CharComboEntry";

const CharEditCombos = ({ charID }) => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => setShowForm(false);
  const { data, loading, error } = useQuery(GET_COMBOLIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Combos</h1>
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
        <CreateComboForm charID={charID} destroyForm={destroyForm} />
      )}
      <div className="grid grid-cols-3 gap-4 px-4 pt-2 pb-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !data.characters[0].combos.length ? (
          <h3>No Combos</h3>
        ) : (
          data.characters[0].combos.map((combo) => {
            return (
              <CharComboEntry
                key={combo.id}
                charID={charID}
                comboID={combo.id}
                comboName={combo.name}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CharEditCombos;
