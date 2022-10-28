const CharPageHeaderSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-center space-y-1 p-1">
      <div className="h-[170px] w-full rounded-md bg-gray-300" />
      <div className="h-9 w-full rounded-md bg-gray-300" />
      <div className="h-9 w-full rounded-md bg-gray-300" />
      <div className="h-9 w-full rounded-md bg-gray-300" />
      <div className="aspect-square w-full rounded-md bg-gray-300" />
    </div>
  );
};

export default CharPageHeaderSkeleton;
