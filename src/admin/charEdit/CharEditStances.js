const CharEditStances = ({ charID }) => {
  return (
    <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Stances</h1>
        <button className="rounded-md bg-green-600 p-1 text-lg text-white">
          Create
        </button>
      </div>
      <div className="flex items-center justify-center p-2"></div>
    </div>
  );
};

export default CharEditStances;
