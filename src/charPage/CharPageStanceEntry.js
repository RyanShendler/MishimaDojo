import { useQuery } from "@apollo/client";
import { GET_STANCE_MOVES } from "../queries/GET_STANCE_MOVES";
import { GET_STANCE_SUMMARY } from "../queries/GET_STANCE_SUMMARY";
import { GET_STANCE_TRANSITIONS } from "../queries/GET_STANCE_TRANSITIONS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageMoveRow from "./CharPageMoveRow";

const CharPageStanceEntry = ({
  stanceID,
  stanceName,
  stanceNotation,
  stanceSummary,
  stanceTransitions,
  stanceMoves,
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">{`${stanceName} (${stanceNotation})`}</h3>
      {!stanceSummary ? (
        <p className="text-md ml-2">Summary Goes Here</p>
      ) : (
        <pre className="text-md ml-2 whitespace-pre-wrap font-sans">
          {stanceSummary}
        </pre>
      )}
      <div className="ml-2 flex flex-row items-baseline space-x-1">
        <h4 className="text-lg underline">{"Transitions:"}</h4>
        {!stanceTransitions.length ? (
          <p>None</p>
        ) : (
          <p className="">
            {stanceTransitions.reduce((prev, cur) => {
              return !prev ? cur : prev + ", " + cur;
            }, "")}
          </p>
        )}
      </div>

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
          {!stanceMoves.length ? (
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
            stanceMoves.map((move) => {
              return (
                <CharPageMoveRow
                  key={move.id}
                  moveID={move.id}
                  moveInput={move.input}
                  moveName={move.name}
                  moveBlock={move.onBlock}
                  moveCH={move.onCH}
                  moveHit={move.onHit}
                  dmgCH={move.damageCH}
                  dmgHit={move.damageHit}
                  moveStartup={move.startup}
                  moveSummary={move.summary}
                  moveTags={move.tags}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CharPageStanceEntry;
