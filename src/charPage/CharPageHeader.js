import { useQuery } from "@apollo/client";
import { GET_CHAR_DIFFICULTY } from "../queries/GET_CHAR_DIFFICULTY";
import { GET_CHAR_IMAGE } from "../queries/GET_CHAR_IMAGE";
import { GET_CHAR_NAME } from "../queries/GET_CHAR_NAME";
import { GET_CHAR_PLAYSTYLE } from "../queries/GET_CHAR_PLAYSTYLE";
import { GET_CHAR_TIER } from "../queries/GET_CHAR_TIER";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageHeader = ({ charID }) => {
  const {
    data: nameData,
    loading: nameLoading,
    error: nameError,
  } = useQuery(GET_CHAR_NAME, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const {
    data: imageData,
    loading: imageLoading,
    error: imageError,
  } = useQuery(GET_CHAR_IMAGE, {
    variables: {
      where: {
        id: charID,
      },
    },
  });
  const {
    data: diffData,
    loading: diffLoading,
    error: diffError,
  } = useQuery(GET_CHAR_DIFFICULTY, {
    variables: {
      where: {
        id: charID,
      },
      tagsWhere2: {
        tag: "Difficulty",
      },
    },
  });
  const {
    data: tierData,
    loading: tierLoading,
    error: tierError,
  } = useQuery(GET_CHAR_TIER, {
    variables: {
      where: {
        id: charID,
      },
      tagsWhere2: {
        tag: "Tier",
      },
    },
  });
  const {
    data: playData,
    loading: playLoading,
    error: playError,
  } = useQuery(GET_CHAR_PLAYSTYLE, {
    variables: {
      where: {
        id: charID,
      },
      tagsWhere2: {
        tag: "Playstyle",
      },
    },
  });

  return (
    <div className="flex w-1/3 flex-col items-center overflow-clip border-r border-black">
      <div className="flex w-full flex-col items-center border-b border-black pt-4">
        {imageLoading ? (
          <Loading />
        ) : imageError ? (
          <Error />
        ) : !imageData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : (
          <img className="" src={imageData.characters[0].imageURL} />
        )}
        {nameLoading ? (
          <Loading />
        ) : nameError ? (
          <Error />
        ) : !nameData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : (
          <h1 className="p-2 text-center text-3xl font-bold">
            {nameData.characters[0].name}
          </h1>
        )}
      </div>
      <div className="-mb-[1px] grid w-full grid-cols-[33%_minmax(0,1fr)] grid-rows-3 border-b border-black">
        <div className="flex items-center justify-center border-r border-b border-black p-1">
          <h4 className="text-lg font-bold">Playstyle</h4>
        </div>
        <div className="flex items-center justify-center border-b border-black">
          {playLoading ? (
            <Loading />
          ) : playError ? (
            <Error />
          ) : !playData.characters.length ? (
            <h5>Character Not Found</h5>
          ) : !playData.characters[0].tags.length ? (
            <h5>No Playstyle Tags</h5>
          ) : (
            <h5>
              {playData.characters[0].tags.reduce((prev, cur) => {
                return !prev ? prev + cur.value : prev + ", " + cur.value;
              }, "")}
            </h5>
          )}
        </div>
        <div className="flex items-center justify-center border-r border-b border-black">
          <h4 className="text-lg font-bold">Tier</h4>
        </div>
        <div className="flex items-center justify-center border-b border-black">
          {tierLoading ? (
            <Loading />
          ) : tierError ? (
            <Error />
          ) : !tierData.characters.length ? (
            <h5>Character Not Found</h5>
          ) : !tierData.characters[0].tags.length ? (
            <h5>Untiered</h5>
          ) : (
            <h5>{tierData.characters[0].tags[0].value}</h5>
          )}
        </div>
        <div className="flex items-center justify-center border-r border-black">
          <h4 className="text-lg font-bold">Difficulty</h4>
        </div>
        <div className="flex items-center justify-center ">
          {diffLoading ? (
            <Loading />
          ) : diffError ? (
            <Error />
          ) : !diffData.characters.length ? (
            <h5>Character Not Found</h5>
          ) : !diffData.characters[0].tags.length ? (
            <h5>Unrated</h5>
          ) : (
            <h5>{diffData.characters[0].tags[0].value}</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharPageHeader;
