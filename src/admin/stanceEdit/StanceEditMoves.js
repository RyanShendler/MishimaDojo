const StanceEditMoves = ({ charID, stanceID }) => {
  return (
    <div className="w-3/5 pr-4 pb-4">
      <div className="flex flex-col rounded-sm border border-black">
        <div className="flex w-full items-center justify-between border-b border-black py-1 px-4">
          <h5 className="py-1 text-xl font-bold">Stance Moves</h5>
          <button className="rounded-md border border-black bg-[#EDF0F5] p-1 shadow-md">
            Add Move
          </button>
        </div>
        <div className="">Transitions List Here</div>
      </div>
    </div>
  );
};

export default StanceEditMoves;
