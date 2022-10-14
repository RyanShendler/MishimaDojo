import { useQuery } from "@apollo/client";
import CharEditDifficulty from "./CharEditDifficulty";
import CharEditPlaystyle from "./CharEditPlaystyle";
import CharEditTier from "./CharEditTier";
import { GET_CHAR_TIER } from "../../queries/GET_CHAR_TIER";
import { GET_CHAR_DIFFICULTY } from "../../queries/GET_CHAR_DIFFICULTY";
import { GET_CHAR_PLAYSTYLE } from "../../queries/GET_CHAR_PLAYSTYLE";
import Loading from "../../utility/Loading";
import Error from "../../utility/Error";

const CharEditDetails = ({ charID }) => {
  const variables = (tag) => {
    return {
      variables: {
        where: {
          id: charID,
        },
        tagsWhere2: {
          tag: tag,
        },
      },
    };
  };
  const {
    data: tierData,
    loading: tierLoading,
    error: tierError,
  } = useQuery(GET_CHAR_TIER, variables("Tier"));
  const {
    data: difficultyData,
    loading: difficultyLoading,
    error: difficultyError,
  } = useQuery(GET_CHAR_DIFFICULTY, variables("Difficulty"));
  const {
    data: playstyleData,
    loading: playstyleLoading,
    error: playstyleError,
  } = useQuery(GET_CHAR_PLAYSTYLE, variables("Playstyle"));

  return (
    <div className="grid grid-cols-[33%_minmax(0,1fr)] grid-rows-3">
      <div className="flex items-center justify-center border-r border-b border-black">
        <h4 className="font-bold">Playstyle</h4>
      </div>
      <div className="flex items-center border-b border-black pl-2">
        {playstyleLoading ? (
          <Loading />
        ) : playstyleError ? (
          <Error />
        ) : !playstyleData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : (
          <CharEditPlaystyle
            charID={charID}
            charPlaystyles={playstyleData.characters[0].tags}
          />
        )}
      </div>
      <div className=" flex items-center justify-center border-r border-b border-black">
        <h4 className="font-bold">Tier</h4>
      </div>
      <div className="flex items-center border-b border-black pl-2">
        {tierLoading ? (
          <Loading />
        ) : tierError ? (
          <Error />
        ) : !tierData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !tierData.characters[0].tags.length ? (
          <CharEditTier
            charID={charID}
            charTier={{ id: "", value: "Untiered" }}
          />
        ) : (
          <CharEditTier
            charID={charID}
            charTier={tierData.characters[0].tags[0]}
          />
        )}
      </div>
      <div className="flex items-center justify-center border-r border-b border-black">
        <h4 className="font-bold">Difficulty</h4>
      </div>
      <div className="flex items-center border-b border-black pl-2">
        {difficultyLoading ? (
          <Loading />
        ) : difficultyError ? (
          <Error />
        ) : !difficultyData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !difficultyData.characters[0].tags.length ? (
          <CharEditDifficulty
            charID={charID}
            charDifficulty={{ id: "", value: "Unrated" }}
          />
        ) : (
          <CharEditDifficulty
            charID={charID}
            charDifficulty={difficultyData.characters[0].tags[0]}
          />
        )}
      </div>
    </div>
  );
};

export default CharEditDetails;
