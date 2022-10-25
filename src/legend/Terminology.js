import { GET_TERM_LIST } from "../queries/GET_TERM_LIST";
import { useQuery } from "@apollo/client";
import TerminologyEntry from "./TerminologyEntry";
import Loading from "../utility/Loading";
import Error from "../utility/Error";

const Terminology = () => {
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
    <div className="flex w-2/3 flex-col space-y-4">
      <h2 className="text-2xl font-bold">Terminology</h2>
      <div className="w-full space-x-4 space-y-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.terms.length ? (
          <h3></h3>
        ) : (
          data.terms.map((term) => {
            return (
              <TerminologyEntry
                key={term.id}
                name={term.name}
                description={term.description}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Terminology;
