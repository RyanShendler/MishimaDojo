const CharPageHomeSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-center space-y-2">
      <div className="h-[105px] w-full rounded-md bg-gray-300" />
      <div className="grid w-4/5 grid-cols-2 gap-1">
        <div className="h-[125px] w-full rounded-md bg-gray-300" />
        <div className="h-[125px] w-full rounded-md bg-gray-300" />
      </div>
    </div>
  );
};

export default CharPageHomeSkeleton;
