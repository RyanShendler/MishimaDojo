import { useQuery } from "@apollo/client";
import { GET_STANCE_MOVES } from "../queries/GET_STANCE_MOVES";
import { GET_STANCE_SUMMARY } from "../queries/GET_STANCE_SUMMARY";
import { GET_STANCE_TRANSITIONS } from "../queries/GET_STANCE_TRANSITIONS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageMoveRow from "./CharPageMoveRow";

const CharPageStanceEntry = ({ stanceID, stanceName, stanceNotation }) => {
  const {
    data: sumData,
    loading: sumLoading,
    error: sumError,
  } = useQuery(GET_STANCE_SUMMARY, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });
  const {
    data: tranData,
    loading: tranLoading,
    error: tranError,
  } = useQuery(GET_STANCE_TRANSITIONS, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });
  const {
    data: moveData,
    loading: moveLoading,
    error: moveError,
  } = useQuery(GET_STANCE_MOVES, {
    variables: {
      where: {
        id: stanceID,
      },
    },
  });

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">{`${stanceName} (${stanceNotation})`}</h3>
      {sumLoading ? (
        <Loading />
      ) : sumError ? (
        <Error />
      ) : !sumData.stances.length ? (
        <h3>Stance Not Found</h3>
      ) : !sumData.stances[0].summary ? (
        <p className="text-md ml-2">Summary Goes Here</p>
      ) : (
        <pre className="text-md ml-2 whitespace-pre-wrap font-sans">
          {sumData.stances[0].summary}
        </pre>
      )}
      {tranLoading ? (
        <Loading />
      ) : tranError ? (
        <Error />
      ) : !tranData.stances.length ? (
        <h3>Stance Not Found</h3>
      ) : (
        <div className="ml-2 flex flex-row items-baseline space-x-1">
          <h4 className="text-lg underline">{"Transitions:"}</h4>
          {!tranData.stances[0].transitions.length ? (
            <p>None</p>
          ) : (
            <p className="">
              {tranData.stances[0].transitions.reduce((prev, cur) => {
                return !prev ? cur : prev + ", " + cur;
              }, "")}
            </p>
          )}
        </div>
      )}
      {moveLoading ? (
        <Loading />
      ) : moveError ? (
        <Error />
      ) : !moveData.stances.length ? (
        <h3>Stance Not Found</h3>
      ) : (
        <table className="mt-1 ml-2">
          <tbody>
            <tr className="border border-black">
              <th className="border border-black">Name</th>
              <th className="border border-black">Input</th>
              <th className="border border-black">Startup</th>
              <th className="border border-black">Hit/CH/Block</th>
              <th className="border border-black">{"Damage(Hit/CH)"}</th>
              <th className="border border-black">Summary</th>
              <th className="border border-black">Tags</th>
            </tr>
            {!moveData.stances[0].moves.length ? (
              <tr className="border border-black">
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
                <td className="border border-black text-center">N/A</td>
              </tr>
            ) : (
              moveData.stances[0].moves.map((move) => {
                return (
                  <CharPageMoveRow
                    key={move.id}
                    moveID={move.id}
                    moveInput={move.input}
                    moveName={move.name}
                  />
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharPageStanceEntry;
