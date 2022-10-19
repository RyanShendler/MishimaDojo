import { useQuery } from "@apollo/client";
import { GET_MOVE_PROPS } from "../../queries/GET_MOVE_PROPS";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import MovePropsText from "./MovePropsText";

const MoveEditProps = ({ moveID }) => {
  const { data, loading, error } = useQuery(GET_MOVE_PROPS, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });

  return (
    <div className="w-2/3">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.moves.length ? (
        <h3>Move Not Found</h3>
      ) : (
        <MovePropsText
          moveID={moveID}
          moveStartup={data.moves[0].startup}
          moveHitDmg={data.moves[0].damageHit}
          moveCHDmg={data.moves[0].damageCH}
          moveHit={data.moves[0].onHit}
          moveCH={data.moves[0].onCH}
          moveBlock={data.moves[0].onBlock}
        />
      )}
    </div>
  );
};

export default MoveEditProps;
