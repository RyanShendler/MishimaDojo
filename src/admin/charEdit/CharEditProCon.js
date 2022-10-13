const CharEditProCon = ({ charID }) => {
  return (
    <div className="col-span-2 grid grid-cols-2 grid-rows-[auto_minmax(0,1fr)] px-2 pb-2">
      <div className="flex items-center justify-center border border-black">
        <h3 className="font-bold">Strengths</h3>
      </div>
      <div className="flex items-center justify-center border-y border-r border-black">
        <h3 className="font-bold">Weaknesses</h3>
      </div>
      <div className="flex justify-center border-x border-b border-black">
        <ul className="list-disc">
          <li>Strength 1</li>
          <li>Strength 2</li>
          <li>Strength 3</li>
        </ul>
      </div>
      <div className="flex justify-center border-b border-r border-black">
        <ul className="list-disc">
          <li>Weakness 1</li>
          <li>Weakness 2</li>
          <li>Weakness 3</li>
        </ul>
      </div>
    </div>
  );
};

export default CharEditProCon;
