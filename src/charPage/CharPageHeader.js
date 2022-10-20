import { useQuery } from "@apollo/client";
import { GET_CHAR_IMAGE } from "../queries/GET_CHAR_IMAGE";
import { GET_CHAR_NAME } from "../queries/GET_CHAR_NAME";
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

  return (
    <div className="flex w-1/3 flex-col items-center border-r border-black">
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
      <div className="grid w-full grid-cols-[33%_minmax(0,1fr)] grid-rows-3">
        <div className="flex items-center justify-center border-r border-b border-black p-1">
          <h4 className="text-lg font-bold">Playstyle</h4>
        </div>
        <div className="flex items-center justify-center border-b border-black">
          <h5>Playstyle Here</h5>
        </div>
        <div className="flex items-center justify-center border-r border-b border-black">
          <h4 className="text-lg font-bold">Tier</h4>
        </div>
        <div className="flex items-center justify-center border-b border-black">
          <h5>Tier Here</h5>
        </div>
        <div className="flex items-center justify-center border-r border-black">
          <h4 className="text-lg font-bold">Difficulty</h4>
        </div>
        <div className="flex items-center justify-center ">
          <h5>Difficulty Here</h5>
        </div>
      </div>
    </div>
  );
};

export default CharPageHeader;
