import { GET_TERM_LIST } from "../queries/GET_TERM_LIST";
import { useQuery } from "@apollo/client";
import TerminologyEntry from "./TerminologyEntry";
import Loading from "../utility/Loading";
import Error from "../utility/Error";
import { useState } from "react";
import TerminologySkeleton from "./TerminologySkeleton";

const Terminology = () => {
  const [offset, setOffset] = useState(0);
  const { data, loading, error, refetch } = useQuery(GET_TERM_LIST, {
    variables: {
      options: {
        sort: [
          {
            name: "ASC",
          },
        ],
        limit: 15,
        offset: 0,
      },
    },
  });

  return (
    <div className="flex w-2/3 flex-col space-y-2">
      <h2 className="ml-2 text-2xl font-bold">Terminology</h2>
      {loading ? (
        <TerminologySkeleton />
      ) : error ? (
        <Error />
      ) : !data.terms.length ? (
        <h3></h3>
      ) : (
        <div className="relative flex h-full w-full flex-row">
          <div className="mt-4 w-full">
            {data.terms.map((term) => {
              return (
                <TerminologyEntry
                  key={term.id}
                  name={term.name}
                  description={term.description}
                />
              );
            })}
          </div>
          <div className="absolute inset-y-0 left-[85%] flex flex-col justify-between p-2">
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
                    limit: 15,
                    offset: offset - 15,
                  },
                });
                setOffset(offset - 15);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="100%"
                className="max-w-[2.5rem]"
              >
                <path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" />
              </svg>
            </button>
            <button
              className="rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA] disabled:bg-[#AAB1BB]"
              disabled={offset + 15 >= data.termsAggregate.count}
              onClick={() => {
                refetch({
                  options: {
                    sort: [
                      {
                        name: "ASC",
                      },
                    ],
                    limit: 15,
                    offset: offset + 15,
                  },
                });
                setOffset(offset + 15);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="100%"
                className="max-w-[2.5rem]"
              >
                <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminology;
