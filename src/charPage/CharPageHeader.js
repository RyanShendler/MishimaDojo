import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_HEADER } from "../queries/GET_CHAR_HEADER";
import { GET_SIMILAR_CHARS } from "../queries/GET_SIMILAR_CHARS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import ArchetypeChart from "./ArchetypeChart";
import CharPageHeaderSkeleton from "./CharPageHeaderSkeleton";
import SimilarChars from "./SimilarChars";

const CharPageHeader = ({ charID }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const { data, loading, error } = useQuery(GET_CHAR_HEADER, {
    variables: {
      where: {
        id: charID,
      },
      tagsWhere2: {
        tag_IN: ["Playstyle", "Tier", "Difficulty"],
      },
    },
  });
  const {
    data: simData,
    loading: simLoading,
    error: simError,
  } = useQuery(GET_SIMILAR_CHARS, {
    variables: {
      where: {
        id: charID,
      },
      sort: [
        {
          edge: {
            similarity: "DESC",
          },
        },
      ],
    },
  });

  return (
    <div className="flex w-1/3 flex-col items-center overflow-clip border-r border-black">
      {loading || simLoading ? (
        <CharPageHeaderSkeleton />
      ) : error || simError ? (
        <Error />
      ) : (
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-center border-b border-black pt-4">
            <div
              className={`h-[102px] w-[66px] animate-pulse rounded-md bg-gray-300 ${
                imgLoading ? "inline" : "hidden"
              }`}
            />
            <img
              className={`${imgLoading ? "hidden" : "inline"}`}
              src={data.characters[0].imageURL}
              onLoad={() => setImgLoading(false)}
            />
            <h1 className="p-2 text-center text-3xl font-bold">
              {data.characters[0].name}
            </h1>
          </div>
          <div className="-mb-[1px] grid w-full grid-cols-[33%_minmax(0,1fr)] grid-rows-3 border-b border-black">
            <div className="flex items-center justify-center border-r border-b border-black p-1">
              <h4 className="text-lg font-bold">Playstyle</h4>
            </div>
            <div className="flex items-center justify-center border-b border-black">
              {!data.characters[0].tags.filter((tag) => tag.tag === "Playstyle")
                .length ? (
                <h5>No Playstyle Tags</h5>
              ) : (
                <h5>
                  {data.characters[0].tags
                    .filter((tag) => tag.tag === "Playstyle")
                    .reduce((prev, cur) => {
                      return !prev ? prev + cur.value : prev + ", " + cur.value;
                    }, "")}
                </h5>
              )}
            </div>
            <div className="flex items-center justify-center border-r border-b border-black">
              <h4 className="text-lg font-bold">Tier</h4>
            </div>
            <div className="flex items-center justify-center border-b border-black">
              {!data.characters[0].tags.filter((tag) => tag.tag === "Tier")
                .length ? (
                <h5>Untiered</h5>
              ) : (
                <h5>
                  {
                    data.characters[0].tags.filter(
                      (tag) => tag.tag === "Tier"
                    )[0].value
                  }
                </h5>
              )}
            </div>
            <div className="flex items-center justify-center border-r border-black">
              <h4 className="text-lg font-bold">Difficulty</h4>
            </div>
            <div className="flex items-center justify-center ">
              {!data.characters[0].tags.filter(
                (tag) => tag.tag === "Difficulty"
              ).length ? (
                <h5>Unrated</h5>
              ) : (
                <h5>
                  {
                    data.characters[0].tags.filter(
                      (tag) => tag.tag === "Difficulty"
                    )[0].value
                  }
                </h5>
              )}
            </div>
          </div>
          <ArchetypeChart
            poke={data.characters[0].poke}
            pressure={data.characters[0].pressure}
            defense={data.characters[0].defense}
            whiffPunish={data.characters[0].whiffPunish}
            keepout={data.characters[0].keepout}
            mixup={data.characters[0].mixup}
          />
          <SimilarChars
            similarChars={simData.characters[0].similarConnection.edges}
          />
        </div>
      )}
    </div>
  );
};

export default CharPageHeader;
