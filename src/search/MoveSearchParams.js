import { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SEARCH_MOVES } from "../queries/SEARCH_MOVES";
import { GET_ALL_MOVE_TAGS } from "../queries/GET_ALL_MOVE_TAGS";
import Loading from "../utility/Loading";
import Error from "../utility/Error";
import { GET_CHAR_LIST } from "../queries/GET_CHAR_LIST";
import MoveSearchResults from "./MoveSearchResults";

const MoveSearchParams = () => {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [startup, setStartup] = useState("");
  const [tag, setTag] = useState("");
  const [character, setCharacter] = useState("");
  const [
    searchMoves,
    {
      called: moveCalled,
      loading: moveLoading,
      error: moveError,
      data: moveData,
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
  } = useQuery(GET_CHAR_LIST);

  const getMoveVars = () => {
    let vars = {
      where: {
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
      },
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
      },
    };
    if (name) vars.where.name = name;
    if (input) vars.where.AND[0].input = input;
    if (startup) vars.where.AND[0].AND[0].startup = parseInt(startup);
    if (tag) vars.where.AND[0].AND[0].AND[0].tags_SOME = { id: tag };
    if (character)
      vars.where.AND[0].AND[0].AND[0].AND[0] = {
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
          searchMoves({ variables: variables });
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
          <Loading />
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
          <Loading />
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
        <Loading />
      ) : moveError ? (
        <Error />
      ) : (
        <MoveSearchResults results={moveData.moves} />
      )}
    </div>
  );
};

export default MoveSearchParams;
