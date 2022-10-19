import { useQuery } from "@apollo/client";
import { GET_COMBO_HEADER } from "../../queries/GET_COMBO_HEADER";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import ComboHeaderText from "./ComboHeaderText";

const ComboEditHeader = ({ comboID }) => {
  const { data, loading, error } = useQuery(GET_COMBO_HEADER, {
    variables: {
      where: {
        id: comboID,
      },
    },
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.combos.length ? (
        <h3>Combo Not Found</h3>
      ) : (
        <ComboHeaderText comboID={comboID} comboName={data.combos[0].name} />
      )}
    </div>
  );
};

export default ComboEditHeader;
