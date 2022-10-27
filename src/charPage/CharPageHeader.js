import { useQuery } from "@apollo/client";
import { GET_CHAR_DIFFICULTY } from "../queries/GET_CHAR_DIFFICULTY";
import { GET_CHAR_HEADER } from "../queries/GET_CHAR_HEADER";
import { GET_CHAR_IMAGE } from "../queries/GET_CHAR_IMAGE";
import { GET_CHAR_NAME } from "../queries/GET_CHAR_NAME";
import { GET_CHAR_PLAYSTYLE } from "../queries/GET_CHAR_PLAYSTYLE";
import { GET_CHAR_TIER } from "../queries/GET_CHAR_TIER";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageHeader = ({ charID }) => {
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

  return (
    <div className="flex w-1/3 flex-col items-center overflow-clip border-r border-black">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="w-full">
          <div className="flex w-full flex-col items-center border-b border-black pt-4">
            <img className="" src={data.characters[0].imageURL} />
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
        </div>
      )}
    </div>
  );
};

export default CharPageHeader;
