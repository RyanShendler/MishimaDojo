import { useState } from "react";
import CreateTagForm from "./CreateTagForm";
import TagListEntry from "./TagListEntry";

const TagList = () => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col rounded-sm border border-black bg-gray-200 shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Tags</h1>
        {showForm ? (
          <button
            className="rounded-md bg-red-600 p-1 text-lg text-white"
            onClick={destroyForm}
          >
            Cancel
          </button>
        ) : (
          <button
            className="rounded-md bg-green-600 p-1 text-lg text-white"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create
          </button>
        )}
      </div>
      {showForm && <CreateTagForm />}
      <div className="flex flex-col items-center space-y-2 p-2">
        <TagListEntry />
        <TagListEntry />
      </div>
    </div>
  );
};

export default TagList;
