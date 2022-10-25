import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_TERM_LIST } from "../../queries/GET_TERM_LIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CreateTermForm from "./CreateTermForm";
import TermListEntry from "./TermListEntry";

const TermList = () => {
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => setShowForm(false);
  const { data, loading, error } = useQuery(GET_TERM_LIST, {
    variables: {
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
      },
    },
  });

  return (
    <div className="flex w-1/3 flex-col rounded-sm border border-black bg-content shadow-md">
      <div className="flex w-full flex-row items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl font-bold">Terms</h1>
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
      {showForm && <CreateTermForm destroyForm={destroyForm} />}
      <div className="grid grid-cols-2 gap-4 px-4 pt-2 pb-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.terms.length ? (
          <h3>No Terms</h3>
        ) : (
          data.terms.map((term) => {
            return (
              <TermListEntry
                key={term.id}
                termID={term.id}
                termName={term.name}
                termDescription={term.description}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TermList;
