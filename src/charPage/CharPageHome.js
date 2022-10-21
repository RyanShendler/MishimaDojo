import { useQuery } from "@apollo/client";
import { GET_CHAR_STRENGTHS } from "../queries/GET_CHAR_STRENGTHS";
import { GET_CHAR_SUMMARY } from "../queries/GET_CHAR_SUMMARY";
import { GET_CHAR_WEAKNESSES } from "../queries/GET_CHAR_WEAKNESSES";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageHome = ({ charID }) => {
  const {
    data: sumData,
    loading: sumLoading,
    error: sumError,
  } = useQuery(GET_CHAR_SUMMARY, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const {
    data: strengthData,
    loading: strengthLoading,
    error: strengthError,
  } = useQuery(GET_CHAR_STRENGTHS, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const {
    data: weakData,
    loading: weakLoading,
    error: weakError,
  } = useQuery(GET_CHAR_WEAKNESSES, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="flex flex-col items-center p-2">
      {sumLoading ? (
        <Loading />
      ) : sumError ? (
        <Error />
      ) : !sumData.characters.length ? (
        <h3>Character Not Found</h3>
      ) : !sumData.characters[0].summary ? (
        <p className="w-full pb-2">Summary Goes Here</p>
      ) : (
        <pre className="w-full whitespace-pre-wrap pb-2 font-sans">
          {sumData.characters[0].summary}
        </pre>
      )}
      <div className="grid w-4/5 grid-cols-2 grid-rows-[auto_minmax(0,1fr)] pt-2">
        <div className="flex items-center justify-center border border-black">
          <h3 className="text-center text-lg font-bold">Strengths</h3>
        </div>
        <div className="flex items-center justify-center border-y border-r border-black">
          <h3 className="text-center text-lg font-bold">Weaknesses</h3>
        </div>
        <div className="border-x border-b border-black">
          {strengthLoading ? (
            <Loading />
          ) : strengthError ? (
            <Error />
          ) : !strengthData.characters.length ? (
            <h3>Character Not Found</h3>
          ) : !strengthData.characters[0].strengths.length ? (
            <h3 className="p-1">No Strengths</h3>
          ) : (
            <ul className="list-inside list-disc p-1 text-center">
              {strengthData.characters[0].strengths.map((strength, index) => {
                return <li key={index}>{strength}</li>;
              })}
            </ul>
          )}
        </div>
        <div className="border-r border-b border-black">
          {weakLoading ? (
            <Loading />
          ) : weakError ? (
            <Error />
          ) : !weakData.characters.length ? (
            <h3>Character Not Found</h3>
          ) : !weakData.characters[0].weaknesses.length ? (
            <h3 className="p-1">No Weaknesses</h3>
          ) : (
            <ul className="list-inside list-disc p-1 text-center">
              {weakData.characters[0].weaknesses.map((weakness, index) => {
                return <li key={index}>{weakness}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharPageHome;
