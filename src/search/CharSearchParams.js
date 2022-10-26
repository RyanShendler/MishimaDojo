import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SEARCH_CHARS } from "../queries/SEARCH_CHARS";
import { GET_ALL_TIERS } from "../queries/GET_ALL_TIERS";
import { GET_ALL_DIFFICULTIES } from "../queries/GET_ALL_DIFFICULTIES";
import { GET_ALL_PLAYSTYLES } from "../queries/GET_ALL_PLAYSTYLES";
import Loading from "../utility/Loading";
import Error from "../utility/Error";
import CharSearchResults from "./CharSearchResults";

const CharSearchParams = () => {
  const [name, setName] = useState("");
  const [tier, setTier] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [playstyle, setPlaystyle] = useState("");
  const [offset, setOffset] = useState(0);
  const [
    searchChars,
    {
      called: charCalled,
      loading: charLoading,
      error: charError,
      data: charData,
      refetch,
    },
  ] = useLazyQuery(SEARCH_CHARS);
  const {
    data: tierData,
    loading: tierLoading,
    error: tierError,
  } = useQuery(GET_ALL_TIERS, {
    variables: {
      where: {
        tag: "Tier",
      },
    },
  });
  const {
    data: diffData,
    loading: diffLoading,
    error: diffError,
  } = useQuery(GET_ALL_DIFFICULTIES, {
    variables: {
      where: {
        tag: "Difficulty",
      },
    },
  });
  const {
    data: playData,
    loading: playLoading,
    error: playError,
  } = useQuery(GET_ALL_PLAYSTYLES, {
    variables: {
      where: {
        tag: "Playstyle",
      },
    },
  });

  const getCharVars = () => {
    let vars = {
      AND: [
        {
          AND: [
            {
              AND: [],
            },
          ],
        },
      ],
    };
    if (name) vars.name = name;
    if (tier) vars.AND[0].tags_SOME = { id: tier };
    if (difficulty) vars.AND[0].AND[0].tags_SOME = { id: difficulty };
    if (playstyle) vars.AND[0].AND[0].AND[0] = { tags_SOME: { id: playstyle } };
    return vars;
  };

  return (
    <div className="flex w-full flex-col items-center p-2">
      <form
        className="flex w-1/3 flex-col items-center space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          const variables = getCharVars();
          searchChars({
            variables: {
              where: variables,
              options: {
                sort: [
                  {
                    name: "ASC",
                  },
                ],
                limit: 9,
                offset: 0,
              },
              charactersAggregateWhere2: variables,
            },
          });
          setOffset(0);
        }}
      >
        <label className="w-full text-center text-xl">
          Name
          <input
            className="ml-2 min-w-[40%]"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        {tierLoading ? (
          <Loading />
        ) : tierError ? (
          <Error />
        ) : (
          <label className="w-full text-center text-xl">
            Tier
            <select
              className="ml-2 min-w-[40%]"
              value={tier}
              onChange={(e) => {
                setTier(e.target.value);
              }}
            >
              <option value={""} />
              {tierData.characterTags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.value}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        {diffLoading ? (
          <Loading />
        ) : diffError ? (
          <Error />
        ) : (
          <label className="w-full text-center text-xl">
            Difficulty
            <select
              className="ml-2 min-w-[40%]"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <option value={""} />
              {diffData.characterTags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.value}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        {playLoading ? (
          <Loading />
        ) : playError ? (
          <Error />
        ) : (
          <label className="w-full text-center text-xl">
            Playstyle
            <select
              className="ml-2 min-w-[40%]"
              value={playstyle}
              onChange={(e) => {
                setPlaystyle(e.target.value);
              }}
            >
              <option value={""} />
              {playData.characterTags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.value}
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
      {!charCalled ? (
        <div></div>
      ) : charLoading ? (
        <Loading />
      ) : charError ? (
        <Error />
      ) : (
        <div className="mt-2 w-full">
          <CharSearchResults results={charData.characters} />
          {!charData.characters.length ? (
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
                        limit: 9,
                        offset: offset - 9,
                      },
                    });
                    setOffset(offset - 9);
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
                  disabled={offset + 9 >= charData.charactersAggregate.count}
                  onClick={() => {
                    refetch({
                      options: {
                        sort: [
                          {
                            name: "ASC",
                          },
                        ],
                        limit: 9,
                        offset: offset + 9,
                      },
                    });
                    setOffset(offset + 9);
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

export default CharSearchParams;
