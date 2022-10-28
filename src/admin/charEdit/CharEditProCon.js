import CharEditStrengths from "./CharEditStrengths";
import CharEditWeaknesses from "./CharEditWeaknesses";

const CharEditProCon = ({ charID }) => {
  return (
    <div className="col-span-3 grid grid-cols-2 grid-rows-[auto_minmax(0,1fr)] px-2 pb-2">
      <div className="flex items-center justify-center border border-black">
        <h3 className="font-bold">Strengths</h3>
      </div>
      <div className="flex items-center justify-center border-y border-r border-black">
        <h3 className="font-bold">Weaknesses</h3>
      </div>
      <div className="flex justify-center border-x border-b border-black">
        <CharEditStrengths charID={charID} />
      </div>
      <div className="flex justify-center border-b border-r border-black">
        <CharEditWeaknesses charID={charID} />
      </div>
    </div>
  );
};

export default CharEditProCon;
