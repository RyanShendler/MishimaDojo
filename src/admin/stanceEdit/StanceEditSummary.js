import { useQuery } from "@apollo/client";
import { GET_STANCE_SUMMARY } from "../../queries/GET_STANCE_SUMMARY";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import StanceSummaryText from "./StanceSummaryText";

const StanceEditSummary = ({ stanceID }) => {
  const { data, loading, error } = useQuery(GET_STANCE_SUMMARY, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });

  return (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.stances.length ? (
        <h3>Stance Not Found</h3>
      ) : (
        <StanceSummaryText
          stanceID={stanceID}
          stanceSummary={data.stances[0].summary}
        />
      )}
    </div>
  );
};

export default StanceEditSummary;
