import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_LIST } from "../queries/GET_CHAR_LIST";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharListHeader from "./CharListHeader";
import CharListRow from "./CharListRow";
import CreateCharForm from "./CreateCharForm";

const CharacterList = () => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => {
    setShowForm(false);
  };
  //figure out how to handle error
  const { loading, error, data } = useQuery(GET_CHAR_LIST);

  return (
    <div className="flex flex-col rounded-sm border border-black bg-gray-200 shadow-md">
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
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="p-2">
          <table className="w-full table-auto border-collapse border border-black">
            <tbody>
              <CharListHeader />
              {!data.characters.length ? (
                <CharListRow />
              ) : (
                data.characters.map((character) => {
                  return (
                    <CharListRow
                      key={character.charID}
                      charID={character.charID}
                      charName={character.name}
                      charTimestamp={character.lastModified}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
