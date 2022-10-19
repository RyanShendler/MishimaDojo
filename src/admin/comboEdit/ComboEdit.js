import { Link, useParams } from "react-router-dom";
import ComboEditHeader from "./ComboEditHeader";
import ComboEditInputs from "./ComboEditInputs";
import ComboEditLaunchers from "./ComboEditLaunchers";
import ComboEditTags from "./ComboEditTags";

//page for editing a character's combos
const ComboEdit = () => {
  const { charID, comboID } = useParams();

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
        <ComboEditHeader comboID={comboID} />
        <ComboEditLaunchers comboID={comboID} />
        <ComboEditInputs comboID={comboID} />
        <ComboEditTags comboID={comboID} />
      </div>
    </div>
  );
};

export default ComboEdit;
