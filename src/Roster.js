import { useQuery } from "@apollo/client";
import { GET_CHAR_LIST } from "./queries/GET_CHAR_LIST";
import RosterEntry from "./RosterEntry";
import RosterSkeleton from "./RosterSkeleton";
import Error from "./utility/Error";
import Loading from "./utility/Loading";

const Roster = () => {
  const { data, loading, error } = useQuery(GET_CHAR_LIST, {
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
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
        <div className="flex w-full items-center justify-center bg-header p-2">
          <h1 className="text-4xl text-[#F1F5F9]">Roster</h1>
        </div>
        {loading ? (
          <RosterSkeleton />
        ) : error ? (
          <Error />
        ) : !data.characters.length ? (
          <h3>No Characters</h3>
        ) : (
          <div id="char-select" className="grid grid-cols-10 gap-3 p-3">
            {data.characters.map((char) => {
              return (
                <RosterEntry
                  key={char.id}
                  charID={char.id}
                  charImage={char.imageURL}
                  charName={char.name}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roster;
