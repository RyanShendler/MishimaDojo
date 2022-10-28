const CharPageMoveSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col space-y-1">
      {Array(13)
        .fill(true)
        .map((_, i) => {
          return (
            <div key={i} className="h-[50px] w-full rounded-md bg-gray-300" />
          );
        })}
    </div>
  );
};

export default CharPageMoveSkeleton;
