import { Link } from "react-router-dom";

const SimilarCharEntry = ({ charID, charName, similarity }) => {
  return (
    <Link
      to={`/characters/${charID}/home`}
      className="mb-1 flex w-4/5 justify-between rounded-md bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]"
    >
      <h6>{charName}</h6>
      <h6>{`${(similarity * 100).toFixed(2)}% similar`}</h6>
    </Link>
  );
};

export default SimilarCharEntry;
