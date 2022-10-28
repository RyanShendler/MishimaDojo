const CharResultsSkeleton = () => {
  return (
    <div className="mt-2 flex w-full animate-pulse flex-col items-center">
      <div className="grid w-2/3 grid-cols-3 gap-4">
        {Array(9)
          .fill(true)
          .map((_, i) => {
            return <div key={i} className="h-[112px] rounded-md bg-gray-300" />;
          })}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-2/3 justify-between p-2">
          <div className="aspect-square h-12 rounded-md bg-gray-300" />
          <div className="aspect-square h-12 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default CharResultsSkeleton;
