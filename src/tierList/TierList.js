import { useQuery } from "@apollo/client";
import { GET_ALL_TIERS } from "../queries/GET_ALL_TIERS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import TierListRow from "./TierListRow";

const TierList = () => {
  const { data, loading, error } = useQuery(GET_ALL_TIERS, {
    variables: {
      where: {
        tag: "Tier",
      },
    },
  });

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex w-[66%] flex-col items-center rounded-md border border-black bg-content shadow-md">
        <div className="flex w-full items-center justify-center bg-header p-2">
          <h1 className="text-4xl text-[#F1F5F9]">Tier List</h1>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characterTags.length ? (
          <h3>No Tiers</h3>
        ) : (
          <div className="flex items-center justify-center p-4">
            <div className="flex flex-col">
              {data.characterTags.map((tier) => {
                return <TierListRow key={tier.id} tier={tier.value} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TierList;
