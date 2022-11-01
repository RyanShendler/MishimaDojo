import { Link, useParams } from "react-router-dom";
import MoveEditHeader from "./MoveEditHeader";
import MoveEditProps from "./MoveEditProps";
import MoveEditSummary from "./MoveEditSummary";
import MoveEditTags from "./MoveEditTags";

//page for editing a character's moves
const MoveEdit = () => {
  const { charID, moveID } = useParams();

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex flex-row items-center justify-end space-x-4 self-end">
        <Link
          className="rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm hover:bg-[#F7F8FA]"
          to={`/admin/characters/${charID}`}
        >
          Back to Character Page
        </Link>
        <Link
          className="rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm hover:bg-[#F7F8FA]"
          to={"/admin/home"}
        >
          Back to Home Page
        </Link>
      </div>
      <div className="flex w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
        <div className="flex flex-row">
          <MoveEditHeader moveID={moveID} />
          <MoveEditProps moveID={moveID} />
        </div>
        <MoveEditSummary moveID={moveID} />
        <MoveEditTags moveID={moveID} />
      </div>
    </div>
  );
};

export default MoveEdit;
