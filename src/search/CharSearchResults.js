import CharResultsEntry from "./CharResultsEntry";

const CharSearchResults = ({ results }) => {
  return (
    <div className="mt-2 flex w-full items-center justify-center p-2">
      {!results.length ? (
        <h3 className="text-center text-xl font-bold">No Results Found</h3>
      ) : (
        <div className="grid w-2/3 grid-cols-3 gap-4">
          {results.map((char) => {
            return (
              <CharResultsEntry
                key={char.id}
                charID={char.id}
                charName={char.name}
                charImage={char.imageURL}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CharSearchResults;
