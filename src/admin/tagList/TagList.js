import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_TAG_LIST } from "../../queries/GET_TAG_LIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CreateTagForm from "./CreateTagForm";
import TagListEntry from "./TagListEntry";

const TagList = () => {
  const { loading, error, data } = useQuery(GET_TAG_LIST);
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex w-1/3 flex-col rounded-sm border border-black bg-content shadow-md">
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
      {showForm && <CreateTagForm destroyForm={destroyForm} />}
      <div className="grid grid-cols-2 gap-4 px-4 pt-2 pb-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.characterTags.length &&
          !data.comboTags.length &&
          !data.moveTags.length ? (
          <h1>No Tags</h1>
        ) : (
          Object.keys(data).map((type) => {
            return !data[type].length
              ? null
              : data[type].map((tag) => {
                  return (
                    <TagListEntry
                      key={tag.id}
                      tagID={tag.id}
                      tagName={tag.tag}
                      tagType={type}
                      tagValue={tag.value}
                    />
                  );
                });
          })
        )}
      </div>
    </div>
  );
};

export default TagList;
