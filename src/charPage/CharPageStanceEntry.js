const CharPageStanceEntry = ({ stanceID, stanceName, stanceNotation }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold">{`${stanceName} (${stanceNotation})`}</h3>
    </div>
  );
};

export default CharPageStanceEntry;
