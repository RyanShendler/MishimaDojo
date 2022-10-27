import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_TERM_LIST } from "../../queries/GET_TERM_LIST";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CreateTermForm from "./CreateTermForm";
import TermListEntry from "./TermListEntry";

const TermList = () => {
  const [offset, setOffset] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const destroyForm = () => setShowForm(false);
  const { data, loading, error, refetch } = useQuery(GET_TERM_LIST, {
    variables: {
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
        limit: 6,
        offset: 0,
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
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.terms.length ? (
        <h3>No Terms</h3>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4 pt-2 pb-4">
          {data.terms.map((term) => {
            return (
              <TermListEntry
                key={term.id}
                termID={term.id}
                termName={term.name}
                termDescription={term.description}
              />
            );
          })}
          <div className="col-span-2 flex flex-row justify-between p-2">
            <button
              className="rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA] disabled:bg-[#AAB1BB]"
              disabled={offset === 0}
              onClick={() => {
                refetch({
                  options: {
                    sort: [
                      {
                        name: "ASC",
                      },
                    ],
                    limit: 6,
                    offset: offset - 6,
                  },
                });
                setOffset(offset - 6);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="100%"
                className="max-w-[2.5rem]"
              >
                <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
              </svg>
            </button>
            <button
              className="rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA] disabled:bg-[#AAB1BB]"
              disabled={offset + 6 >= data.termsAggregate.count}
              onClick={() => {
                refetch({
                  options: {
                    sort: [
                      {
                        name: "ASC",
                      },
                    ],
                    limit: 6,
                    offset: offset + 6,
                  },
                });
                setOffset(offset + 6);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="max-w-[2.5rem]"
                width="100%"
              >
                <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermList;
