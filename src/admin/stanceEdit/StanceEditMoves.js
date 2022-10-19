import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_STANCE_MOVES } from "../../queries/GET_STANCE_MOVES";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import StanceMoveEntry from "./StanceMoveEntry";
import StanceMovePopup from "./StanceMovePopup";

const StanceEditMoves = ({ charID, stanceID }) => {
  const [showPopup, setShowPopup] = useState(false);
  const destroyPopup = () => setShowPopup(false);
  const { data, loading, error } = useQuery(GET_STANCE_MOVES, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });

  return (
    <div className="w-3/5 pr-4 pb-4">
      <div className="flex flex-col rounded-sm border border-black">
        <div className="flex w-full items-center justify-between border-b border-black py-1 px-4">
          <h5 className="py-1 text-xl font-bold">Stance Moves</h5>
          <button
            className="rounded-md bg-green-600 p-1 text-white"
            onClick={() => setShowPopup(true)}
          >
            Add Move
          </button>{" "}
          {showPopup && (
            <StanceMovePopup
              stanceID={stanceID}
              destroyPopup={destroyPopup}
              charID={charID}
            />
          )}
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.stances.length ? (
          <h3>Stance Not Found</h3>
        ) : !data.stances[0].moves.length ? (
          <div className="w-full p-1">
            <h5>No Moves</h5>
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-2 p-2">
            {data.stances[0].moves.map((move) => {
              return (
                <StanceMoveEntry
                  key={move.id}
                  charID={charID}
                  stanceID={stanceID}
                  moveID={move.id}
                  moveName={move.name}
                  moveInput={move.input}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StanceEditMoves;
