import RosterEntry from "./RosterEntry";

const Roster = () => {
  const roster = [];
  for (let i = 0; i < 50; i++) {
    roster.push(i);
  }
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-3xl">Roster</h1>
      <div id="char-select" className="grid grid-cols-10 gap-6">
        {roster.map((index) => {
          return <RosterEntry key={index} />;
        })}
      </div>
    </div>
  );
};

export default Roster;
