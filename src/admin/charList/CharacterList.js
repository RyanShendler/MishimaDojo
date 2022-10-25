import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_LIST } from "../../queries/GET_CHAR_LIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CreateCharForm from "./CreateCharForm";
import CharListEntry from "./CharListEntry";

const CharacterList = () => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => {
    setShowForm(false);
  };
  const { loading, error, data } = useQuery(GET_CHAR_LIST, {
    variables: {
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
      },
    },
  });

  return (
    <div className="flex w-1/3 flex-col rounded-sm border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Characters</h1>
        {showForm ? (
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
            onClick={() => {
              destroyForm();
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create
          </button>
        )}
      </div>
      {showForm && <CreateCharForm destroyForm={destroyForm} />}
      <div className="grid grid-cols-2 gap-4 px-4 pt-2 pb-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characters.length ? (
          <h1>No Characters</h1>
        ) : (
          data.characters.map((character) => {
            return (
              <CharListEntry
                key={character.id}
                charID={character.id}
                charName={character.name}
                charImage={character.imageURL}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default CharacterList;
