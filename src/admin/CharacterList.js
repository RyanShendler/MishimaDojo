import CharListHeader from "./CharListHeader";
import CharListRow from "./CharListRow";

const CharacterList = () => {
  return (
    <div className="flex flex-col rounded-sm border border-black bg-gray-200 shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Characters</h1>
        <button className="rounded-md bg-green-600 p-1 text-lg text-white">
          Create
        </button>
      </div>
      <div className="p-2">
        <table className="w-full table-auto border-collapse border border-black">
          <tbody>
            <CharListHeader />
            <CharListRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharacterList;
