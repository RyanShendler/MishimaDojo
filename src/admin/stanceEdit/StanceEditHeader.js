import { useQuery } from "@apollo/client";
import { GET_STANCE_HEADER } from "../../queries/GET_STANCE_HEADER";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import StanceHeaderText from "./StanceHeaderText";

const StanceEditHeader = ({ stanceID }) => {
  const { data, loading, error } = useQuery(GET_STANCE_HEADER, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.stances.length ? (
        <h3>Stance Not Found</h3>
      ) : (
        <StanceHeaderText
          stanceID={stanceID}
          stanceName={data.stances[0].name}
          stanceNotation={data.stances[0].notation}
        />
      )}
    </div>
  );
};

export default StanceEditHeader;
