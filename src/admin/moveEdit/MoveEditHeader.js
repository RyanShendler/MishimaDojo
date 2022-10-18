import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MOVE_HEADER } from "../../queries/GET_MOVE_HEADER";
import { SET_MOVE_HEADER } from "../../mutations/SET_MOVE_HEADER";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import MoveHeaderText from "./MoveHeaderText";

const MoveEditHeader = ({ moveID }) => {
  const { data, loading, error } = useQuery(GET_MOVE_HEADER, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });

  return (
    <div className="w-1/3 border-r border-b border-black">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.moves.length ? (
        <h3>Move Not Found</h3>
      ) : (
        <MoveHeaderText
          moveID={moveID}
          moveInput={data.moves[0].input}
          moveName={data.moves[0].name}
        />
      )}
    </div>
  );
};

export default MoveEditHeader;
