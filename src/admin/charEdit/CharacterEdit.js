import { Link, useParams } from "react-router-dom";
import CharEditHeader from "./CharEditHeader";
import CharEditDetails from "./CharEditDetails";
import CharEditSummary from "./CharEditSummary";
import CharEditProCon from "./CharEditProCon";
import CharEditMoves from "./CharEditMoves";
import CharEditStances from "./CharEditStances";
import CharEditCombos from "./CharEditCombos";
import CharEditRatings from "./CharEditRatings";

//home page for editing a character
const CharacterEdit = () => {
  const { charID } = useParams();

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Link
        className="self-end rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm hover:bg-[#F7F8FA]"
        to="/admin/home"
      >
        Back to Home Page
      </Link>
      <div className="grid w-[66%] grid-cols-3 rounded-md border border-black bg-content shadow-md">
        <CharEditHeader charID={charID} />
        <CharEditDetails charID={charID} />
        <CharEditRatings charID={charID} />
        <CharEditSummary charID={charID} />
        <CharEditProCon charID={charID} />
      </div>
      <CharEditMoves charID={charID} />
      <CharEditStances charID={charID} />
      <CharEditCombos charID={charID} />
    </div>
  );
};

export default CharacterEdit;
