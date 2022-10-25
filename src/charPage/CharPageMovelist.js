import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MOVELIST } from "../queries/GET_MOVELIST";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageMoveRow from "./CharPageMoveRow";

const CharPageMovelist = () => {
  const { charID } = useParams();
  const { data, loading, error } = useQuery(GET_MOVELIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="overflow-auto p-2">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <table className="w-full table-auto border-collapse border border-black">
          <tbody>
            <tr className="border border-black">
              <th className="border border-black p-1">Name</th>
              <th className="border border-black p-1">Input</th>
              <th className="border border-black p-1">Startup</th>
              <th className="border border-black p-1">Hit/CH/Block</th>
              <th className="border border-black p-1">{"Damage(Hit/CH)"}</th>
              <th className="border border-black p-1">Summary</th>
              <th className="border border-black p-1">Tags</th>
            </tr>
            {!data.characters[0].moves.length ? (
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
              data.characters[0].moves.map((move, index) => {
                return (
                  <CharPageMoveRow
                    key={move.id}
                    moveID={move.id}
                    moveName={move.name}
                    moveInput={move.input}
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

export default CharPageMovelist;
