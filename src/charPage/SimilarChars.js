import { useQuery } from "@apollo/client";
import { GET_SIMILAR_CHARS } from "../queries/GET_SIMILAR_CHARS";
import SimilarCharEntry from "./SimilarCharEntry";

const SimilarChars = ({ similarChars }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <h3 className="text-center text-xl font-bold">Similar Characters</h3>
      <div className="flex w-full flex-col items-center">
        {similarChars.map((char) => {
          return (
            <SimilarCharEntry
              key={char.node.id}
              charID={char.node.id}
              charName={char.node.name}
              similarity={char.similarity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimilarChars;
