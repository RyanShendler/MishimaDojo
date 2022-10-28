import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SEARCH_MOVES } from "../queries/SEARCH_MOVES";
import { GET_ALL_MOVE_TAGS } from "../queries/GET_ALL_MOVE_TAGS";
import Loading from "../utility/Loading";
import Error from "../utility/Error";
import { GET_CHAR_LIST } from "../queries/GET_CHAR_LIST";
import MoveSearchResults from "./MoveSearchResults";
import MoveResultsSkeleton from "./MoveResultsSkeleton";

const MoveSearchParams = () => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [startup, setStartup] = useState("");
  const [tag, setTag] = useState("");
  const [character, setCharacter] = useState("");
  const [offset, setOffset] = useState(0);
  const [
    searchMoves,
    {
      called: moveCalled,
      loading: moveLoading,
      error: moveError,
      data: moveData,
      refetch,
    },
  ] = useLazyQuery(SEARCH_MOVES);
  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery(GET_ALL_MOVE_TAGS);
  const {
    data: charData,
    loading: charLoading,
    error: charError,
  } = useQuery(GET_CHAR_LIST, {
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

  const getMoveVars = () => {
    let vars = {
      AND: [
        {
          AND: [
            {
              AND: [
                {
                  AND: [],
                },
              ],
            },
          ],
        },
      ],
    };
    if (name) vars.name = name;
    if (input) vars.AND[0].input = input;
    if (startup) vars.AND[0].AND[0].startup = parseInt(startup);
    if (tag) vars.AND[0].AND[0].AND[0].tags_SOME = { id: tag };
    if (character)
      vars.AND[0].AND[0].AND[0].AND[0] = {
        users_SOME: { id: character },
      };
    return vars;
  };

  return (
    <div className="flex w-full flex-col items-center p-2">
      <form
        className="flex w-1/3 flex-col items-center space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const variables = getMoveVars();
          searchMoves({
            variables: {
              where: variables,
              options: {
                sort: [
                  {
                    name: "ASC",
                  },
                ],
                limit: 12,
                offset: 0,
              },
              movesAggregateWhere2: variables,
            },
          });
          setOffset(0);
        }}
      >
        <label className="w-full text-center text-xl">
          Name
          <input
            className="ml-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="w-full text-center text-xl">
          Input
          <input
            className="ml-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <label className="w-full text-center text-xl">
          Startup
          <input
            className="ml-1 pl-1"
            type="number"
            min="0"
            step="1"
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
          />
        </label>
        {tagLoading ? (
          <div className="h-7 w-3/5 animate-pulse self-center rounded-md bg-gray-300" />
        ) : tagError ? (
          <Error />
        ) : (
          <label className="w-full text-center text-xl">
            Tag
            <select
              className="ml-2 min-w-[40%]"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value={""} />
              {tagData.moveTags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {`${tag.tag} (${tag.value})`}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        {charLoading ? (
          <div className="h-7 w-3/5 animate-pulse self-center rounded-md bg-gray-300" />
        ) : charError ? (
          <Error />
        ) : (
          <label className="w-full text-center text-xl">
            Character
            <select
              className="ml-2 min-w-[40%]"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
            >
              <option />
              {charData.characters.map((char) => {
                return (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        <input
          className="cursor-pointer rounded-md bg-green-600 p-1 text-lg text-white shadow-md"
          type="submit"
          value="Search"
        />
      </form>
      {!moveCalled ? (
        <div></div>
      ) : moveLoading ? (
        <MoveResultsSkeleton />
      ) : moveError ? (
        <Error />
      ) : (
        <div className="mt-2 w-full">
          <MoveSearchResults results={moveData.moves} />
          {!moveData.moves.length ? (
            <div></div>
          ) : (
            <div className="flex w-full justify-center">
              <div className="flex w-2/3 flex-row justify-between p-2">
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
                        limit: 12,
                        offset: offset - 12,
                      },
                    });
                    setOffset(offset - 12);
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
                  disabled={offset + 12 >= moveData.movesAggregate.count}
                  onClick={() => {
                    refetch({
                      options: {
                        sort: [
                          {
                            name: "ASC",
                          },
                        ],
                        limit: 12,
                        offset: offset + 12,
                      },
                    });
                    setOffset(offset + 12);
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
      )}
    </div>
  );
};

export default MoveSearchParams;
