import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAR_HOME } from "../queries/GET_CHAR_HOME";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageHomeSkeleton from "./CharPageHomeSkeleton";

const CharPageHome = () => {
  const { charID } = useParams();
  const { data, loading, error } = useQuery(GET_CHAR_HOME, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="w-full p-2">
      {loading ? (
        <CharPageHomeSkeleton />
      ) : error ? (
        <Error />
      ) : (
        <div className="flex flex-col items-center overflow-y-auto">
          {!data.characters[0].summary ? (
            <p className="w-full pb-2">Summary Goes Here</p>
          ) : (
            <pre className="w-full whitespace-pre-wrap pb-2 font-sans">
              {data.characters[0].summary}
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
              {!data.characters[0].strengths.length ? (
                <h3 className="p-1">No Strengths</h3>
              ) : (
                <ul className="list-inside list-disc p-1 text-center">
                  {data.characters[0].strengths.map((strength, index) => {
                    return <li key={index}>{strength}</li>;
                  })}
                </ul>
              )}
            </div>
            <div className="border-r border-b border-black">
              {!data.characters[0].weaknesses.length ? (
                <h3 className="p-1">No Weaknesses</h3>
              ) : (
                <ul className="list-inside list-disc p-1 text-center">
                  {data.characters[0].weaknesses.map((weakness, index) => {
                    return <li key={index}>{weakness}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharPageHome;
