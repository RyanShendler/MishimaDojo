const TagListEntry = () => {
  return (
    <div className="flex flex-row justify-between space-x-4 rounded-md border border-black p-2 shadow-md">
      <div className="flex flex-col items-start justify-evenly">
        <h3 className="text-lg font-bold">Type</h3>
        <h5>Tag</h5>
        <h5>Value</h5>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <button className="rounded-md bg-green-600 p-1 text-white">Edit</button>
        <button className="rounded-md bg-red-600 p-1 text-white">Delete</button>
      </div>
    </div>
  );
};

export default TagListEntry;
