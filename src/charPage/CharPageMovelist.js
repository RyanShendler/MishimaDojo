import { useQuery } from "@apollo/client";
import { GET_MOVELIST } from "../queries/GET_MOVELIST";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageMoveRow from "./CharPageMoveRow";

const CharPageMovelist = ({ charID }) => {
  const { data, loading, error } = useQuery(GET_MOVELIST, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="p-2">
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
              <th className="border border-black">Name</th>
              <th className="border border-black">Input</th>
              <th className="border border-black">Startup</th>
              <th className="border border-black">Hit/CH/Block</th>
              <th className="border border-black">{"Damage(Hit/CH)"}</th>
              <th className="border border-black">Summary</th>
              <th className="border border-black">Tags</th>
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
              data.characters[0].moves.map((move) => {
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
