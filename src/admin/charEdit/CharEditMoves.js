const CharEditMoves = ({ charID }) => {
  return (
    <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Movelist</h1>
        <button className="rounded-md bg-green-600 p-1 text-lg text-white">
          Create
        </button>
      </div>
      <div className="flex items-center justify-center p-2">
        <table className="w-full border-collapse border border-black text-center">
          <tbody>
            <tr className="border border-black">
              <th className="border border-black">Name</th>
              <th className="border border-black">Input</th>
              <th className="border border-black"></th>
              <th className="border border-black"></th>
            </tr>
            <tr className="border border-black">
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black">Edit</td>
              <td className="border border-black">Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharEditMoves;
