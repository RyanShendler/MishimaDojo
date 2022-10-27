import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_LIST } from "../../queries/GET_CHAR_LIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CreateCharForm from "./CreateCharForm";
import CharListEntry from "./CharListEntry";

const CharacterList = () => {
  const [showForm, setShowForm] = useState(false);
  const [offset, setOffset] = useState(0);
  const destroyForm = () => {
    setShowForm(false);
  };
  const { loading, error, data, refetch } = useQuery(GET_CHAR_LIST, {
    variables: {
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
        limit: 8,
        offset: 0,
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
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h1>No Characters</h1>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4 pt-2 pb-4">
          {data.characters.map((character) => {
            return (
              <CharListEntry
                key={character.id}
                charID={character.id}
                charName={character.name}
                charImage={character.imageURL}
              />
            );
          })}
          <div className="col-span-2 flex flex-row justify-between p-2">
            <button
              className="rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA] disabled:bg-[#AAB1BB]"
              disabled={offset === 0}
              onClick={() => {
                refetch({
                  options: {
                    sort: [
                      {
                        name: "ASC",
                      },
                    ],
                    limit: 8,
                    offset: offset - 8,
                  },
                });
                setOffset(offset - 8);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="100%"
                className="max-w-[2.5rem]"
              >
                <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
              </svg>
            </button>
            <button
              className="rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA] disabled:bg-[#AAB1BB]"
              disabled={offset + 8 >= data.charactersAggregate.count}
              onClick={() => {
                refetch({
                  options: {
                    sort: [
                      {
                        name: "ASC",
                      },
                    ],
                    limit: 8,
                    offset: offset + 8,
                  },
                });
                setOffset(offset + 8);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="max-w-[2.5rem]"
                width="100%"
              >
                <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
