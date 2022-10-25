import MoveResultsEntry from "./MoveResultsEntry";

const MoveSearchResults = ({ results }) => {
  return (
    <div className="mt-2 flex w-full items-center justify-center p-2">
      {!results.length ? (
        <h3 className="text-center text-xl font-bold">No Results Found</h3>
      ) : (
        <div className="grid w-2/3 grid-cols-3 gap-4">
          {results.map((move) => {
            return (
              <MoveResultsEntry
                key={move.id}
                moveID={move.id}
                moveInput={move.input}
                moveName={move.name}
                charID={move.users[0].id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoveSearchResults;
