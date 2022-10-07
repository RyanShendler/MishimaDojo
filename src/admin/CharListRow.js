const CharListRow = ({ charId = "", charName = "", charTimestamp = "" }) => {
  return (
    <tr>
      <td className="char-list-entry">{charId}</td>
      <td className="char-list-entry">{charName}</td>
      <td className="char-list-entry">{charTimestamp}</td>
      <td className="char-list-entry">
        <button className="rounded-md bg-green-600 p-1 text-white">Edit</button>
      </td>
      <td className="char-list-entry">
        <button className="rounded-md bg-red-600 p-1 text-white">Delete</button>
      </td>
    </tr>
  );
};

export default CharListRow;
