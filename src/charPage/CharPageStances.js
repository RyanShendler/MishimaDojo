import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAR_STANCES } from "../queries/GET_CHAR_STANCES";
import { GET_STANCELIST } from "../queries/GET_STANCELIST";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageStanceEntry from "./CharPageStanceEntry";

const CharPageStances = () => {
  const { charID } = useParams();
  const { data, loading, error } = useQuery(GET_CHAR_STANCES, {
    variables: {
      where: {
        id: charID,
      },
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
    <div className="flex h-full w-full flex-col space-y-4 overflow-y-auto p-2">
      {loading ? (
        <div className="flex animate-pulse flex-col space-y-1">
          <div className="h-6 w-[20%] rounded-md bg-gray-300" />
          <div className="ml-2 h-10 w-full rounded-md bg-gray-300" />
          <div className="ml-2 h-6 w-[30%] rounded-md bg-gray-300" />
          <div className="ml-2 h-6 w-full rounded-md bg-gray-300" />
          <div className="ml-2 h-6 w-full rounded-md bg-gray-300" />
          <div className="ml-2 h-6 w-full rounded-md bg-gray-300" />
          <div className="ml-2 h-6 w-full rounded-md bg-gray-300" />
        </div>
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : !data.characters[0].stances.length ? (
        <div className="flex h-full w-full items-center justify-center">
          <h2 className="text-xl">This Character Has No Stances</h2>
        </div>
      ) : (
        data.characters[0].stances.map((stance) => {
          return (
            <CharPageStanceEntry
              key={stance.id}
              stanceID={stance.id}
              stanceName={stance.name}
              stanceNotation={stance.notation}
              stanceSummary={stance.summary}
              stanceTransitions={stance.transitions}
              stanceMoves={stance.moves}
            />
          );
        })
      )}
    </div>
  );
};

export default CharPageStances;
