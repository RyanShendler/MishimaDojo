import { Link } from "react-router-dom";

const MoveResultsEntry = ({ charID, moveID, moveName, moveInput }) => {
  return (
    <Link to={`/characters/${charID}/moves`}>
      <div className="flex flex-col items-center justify-evenly rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md hover:bg-[#F7F8FA]">
        <h2 className="whitespace-pre-wrap text-center text-xl font-bold">
          {moveName}
        </h2>
        <h3 className="whitespace-pre-wrap text-center text-lg">{moveInput}</h3>
      </div>
    </Link>
  );
};

export default MoveResultsEntry;
