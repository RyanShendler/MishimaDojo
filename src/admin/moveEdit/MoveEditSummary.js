import { useQuery } from "@apollo/client";
import { GET_MOVE_SUMMARY } from "../../queries/GET_MOVE_SUMMARY";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import MoveSummaryText from "./MoveSummaryText";

const MoveEditSummary = ({ moveID }) => {
  const { data, loading, error } = useQuery(GET_MOVE_SUMMARY, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });

  return (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.moves.length ? (
        <h3>Move Not Found</h3>
      ) : (
        <MoveSummaryText moveID={moveID} moveSummary={data.moves[0].summary} />
      )}
    </div>
  );
};

export default MoveEditSummary;
