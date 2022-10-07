import { Link } from "react-router-dom";

const CharListRow = ({ charID = "", charName = "", charTimestamp = "" }) => {
  return (
    <tr>
      <td className="char-list-entry">{charID}</td>
      <td className="char-list-entry">{charName}</td>
      <td className="char-list-entry">{charTimestamp}</td>
      <td className="char-list-entry">
        {charID && (
          <Link
            to={`/admin/characters/${charID}`}
            className="rounded-md bg-green-600 p-1 text-white"
          >
            Edit
          </Link>
        )}
      </td>
      <td className="char-list-entry">
        {charID && (
          <button className="rounded-md bg-red-600 p-1 text-white">
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default CharListRow;
