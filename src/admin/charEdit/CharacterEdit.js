import { Link, useParams } from "react-router-dom";
import CharEditHeader from "./CharEditHeader";
import CharEditDetails from "./CharEditDetails";
import CharEditSummary from "./CharEditSummary";
import CharEditProCon from "./CharEditProCon";

//home page for editing a character
const CharacterEdit = () => {
  const { charID } = useParams();
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Link
        className="text-l self-end rounded-md border border-black bg-[#EDF0F5] p-2 shadow-sm"
        to="/admin/home"
      >
        Back to Home
      </Link>
      <div className="grid grid-cols-2 rounded-md border border-black bg-content shadow-md">
        <CharEditHeader />
        <CharEditDetails />
        <CharEditSummary />
        <CharEditProCon />
      </div>
    </div>
  );
};

export default CharacterEdit;
