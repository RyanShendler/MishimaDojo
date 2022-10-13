import { useQuery } from "@apollo/client";
import { GET_CHAR_IMAGE } from "../../queries/GET_CHAR_IMAGE";
import { GET_CHAR_NAME } from "../../queries/GET_CHAR_NAME";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharEditImage from "./CharEditImage";
import CharEditName from "./CharEditName";

const CharEditHeader = ({ charID }) => {
  const variables = {
    variables: {
      where: {
        id: charID,
      },
    },
  };
  const {
    loading: imageLoading,
    error: imageError,
    data: imageData,
  } = useQuery(GET_CHAR_IMAGE, variables);
  const {
    loading: nameLoading,
    error: nameError,
    data: nameData,
  } = useQuery(GET_CHAR_NAME, variables);

  return (
    <div className="flex flex-row items-center justify-evenly border-b border-r border-black">
      {imageLoading ? (
        <Loading />
      ) : imageError ? (
        <Error />
      ) : !imageData.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <CharEditImage
          charID={charID}
          charImage={imageData.characters[0].imageURL}
        />
      )}
      {nameLoading ? (
        <Loading />
      ) : nameError ? (
        <Error />
      ) : !nameData.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <CharEditName charID={charID} charName={nameData.characters[0].name} />
      )}
    </div>
  );
};

export default CharEditHeader;
