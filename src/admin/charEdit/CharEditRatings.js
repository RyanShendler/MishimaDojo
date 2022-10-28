import { useQuery } from "@apollo/client";
import { GET_RATINGS } from "../../queries/GET_RATINGS";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharRatingText from "./CharRatingText";

const CharEditRatings = ({ charID }) => {
  const { data, loading, error } = useQuery(GET_RATINGS, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="border-b border-l border-black">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <CharRatingText
          charID={charID}
          charDefense={data.characters[0].defense}
          charKeepout={data.characters[0].keepout}
          charWhiff={data.characters[0].whiffPunish}
          charMixup={data.characters[0].mixup}
          charPoke={data.characters[0].poke}
          charPressure={data.characters[0].pressure}
        />
      )}
    </div>
  );
};

export default CharEditRatings;
