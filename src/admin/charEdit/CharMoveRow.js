import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_MOVE } from "../../mutations/DELETE_MOVE";
import { GET_COMBO_LAUNCHERS } from "../../queries/GET_COMBO_LAUNCHERS";
import { GET_FULL_MOVELIST } from "../../queries/GET_FULL_MOVELIST";
import { GET_MOVELIST } from "../../queries/GET_MOVELIST";
import { GET_NEW_LAUNCHERS } from "../../queries/GET_NEW_LAUNCHERS";
import { GET_NONSTANCE_MOVES } from "../../queries/GET_NONSTANCE_MOVES";
import { GET_PUNISHERS } from "../../queries/GET_PUNISHERS";
import { GET_STANCELESS } from "../../queries/GET_STANCELESS";
import { GET_STANCE_MOVES } from "../../queries/GET_STANCE_MOVES";

const CharMoveRow = ({
  charID,
  moveID = "",
  moveName = "",
  moveInput = "",
}) => {
  const [deleteMove] = useMutation(DELETE_MOVE, {
    refetchQueries: [
      GET_MOVELIST,
      GET_NONSTANCE_MOVES,
      GET_STANCE_MOVES,
      GET_COMBO_LAUNCHERS,
      GET_NEW_LAUNCHERS,
      GET_PUNISHERS,
      GET_FULL_MOVELIST,
    ],
    ignoreResults: true,
  });

  return (
    <tr className="">
      <td className="border border-black">
        <div className="min-h-[1.5rem]">{moveName}</div>
      </td>
      <td className="border border-black">
        <div className="min-h-[1.5rem]">{moveInput}</div>
      </td>
      <td className="border border-black">
        {!moveID ? (
          <div className="min-h-[1.5rem]"></div>
        ) : (
          <div className="min-h-[1.5rem]">
            <Link
              className="text-center text-[#0000EE] underline"
              to={`/admin/characters/${charID}/moves/${moveID}`}
            >
              edit
            </Link>
          </div>
        )}
      </td>
      <td className="border border-black">
        {!moveID ? (
          <div className="min-h-[1.5rem]"></div>
        ) : (
          <div className="min-h-[1.5rem]">
            <button
              className="text-center text-red-600"
              onClick={() =>
                deleteMove({
                  variables: {
                    where: {
                      id: moveID,
                    },
                  },
                })
              }
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CharMoveRow;
