const RosterSkeleton = () => {
  return (
    <div className="grid animate-pulse grid-cols-10 gap-3 p-3">
      {Array(50)
        .fill(true)
        .map((_, i) => {
          return (
            <div
              key={i}
              className="aspect-square h-[140px] rounded-md bg-gray-300"
            />
          );
        })}
    </div>
  );
};
export default RosterSkeleton;
