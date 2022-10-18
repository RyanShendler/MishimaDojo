import { Link, useParams } from "react-router-dom";
import StanceEditHeader from "./StanceEditHeader";
import StanceEditMoves from "./StanceEditMoves";
import StanceEditSummary from "./StanceEditSummary";
import StanceEditTransitions from "./StanceEditTransitions";

//page for editing a character's stances
const StanceEdit = () => {
  const { charID, stanceID } = useParams();
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex flex-row items-center justify-end space-x-4 self-end">
        <Link
          to={`/admin/characters/${charID}`}
          className="rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm"
        >
          Back to Character Page
        </Link>
        <Link
          to={"/admin/home"}
          className="rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm"
        >
          Back to Home Page
        </Link>
      </div>
      <div className="flex min-w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
        <StanceEditHeader stanceID={stanceID} />
        <StanceEditSummary stanceID={stanceID} />
        <div className="flex flex-row justify-center space-x-4">
          <StanceEditTransitions stanceID={stanceID} />
          <StanceEditMoves stanceID={stanceID} charID={charID} />
        </div>
      </div>
    </div>
  );
};

export default StanceEdit;
