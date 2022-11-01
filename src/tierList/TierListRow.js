import { useQuery } from "@apollo/client";
import { GET_TIER_CHARS } from "../queries/GET_TIER_CHARS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import TierRowEntry from "./TierRowEntry";

const TierListRow = ({ tier }) => {
  const { data, loading, error } = useQuery(GET_TIER_CHARS, {
    variables: {
      where: {
        tag: "Tier",
        value: tier,
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
    <div className="-mb-[1px] flex border border-black">
      <div className="flex min-w-[7rem] items-center justify-center border-r border-black p-2">
        <h2 className="w-full text-center align-middle text-2xl font-bold">
          {tier}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-2 p-2">
        {loading ? (
          Array(8)
            .fill(true)
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className="h-[102px] w-[66px] rounded-md bg-gray-300"
                />
              );
            })
        ) : error ? (
          <Error />
        ) : !data.characterTags.length ? (
          <h3>Tier Not Found</h3>
        ) : !data.characterTags[0].characters.length ? (
          <h3 className="text-lg">No Characters in this Tier</h3>
        ) : (
          data.characterTags[0].characters.map((char) => {
            return (
              <TierRowEntry
                key={char.id}
                charID={char.id}
                charName={char.name}
                charImage={char.imageURL}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TierListRow;
