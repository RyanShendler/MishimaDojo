import { useQuery } from "@apollo/client";
import { GET_MOVE_TAGS } from "../queries/GET_MOVE_TAGS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageMoveRow = ({
  moveID,
  moveName,
  moveInput,
  moveTags,
  moveSummary,
  moveHit,
  moveBlock,
  moveCH,
  dmgHit,
  dmgCH,
  moveStartup,
}) => {
  return (
    <tr className="border border-black">
      <td className="border border-black text-center font-bold">{moveName}</td>
      <td className="border border-black text-center">{moveInput}</td>
      <td className="border border-black text-center">{`i${moveStartup}`}</td>
      <td className="border border-black text-center">
        {`${moveHit}/${moveCH}/${moveBlock}`}
      </td>
      <td className="border border-black text-center">
        {`${dmgHit}/${dmgCH}`}
      </td>
      <td className="border border-black text-center">
        <pre className="whitespace-pre-wrap p-1 font-sans text-sm">
          {moveSummary}
        </pre>
      </td>
      <td className="border border-black text-center">
        <div className="flex flex-col">
          {moveTags.map((tag) => {
            return (
              <h6
                key={tag.id}
                className="text-sm"
              >{`${tag.tag}(${tag.value})`}</h6>
            );
          })}
        </div>
      </td>
    </tr>
  );
};

export default CharPageMoveRow;
