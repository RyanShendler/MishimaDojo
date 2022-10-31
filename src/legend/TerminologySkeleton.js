const TerminologySkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-row justify-between">
      <div className="my-4 grid w-[82%] grid-cols-3 gap-4">
        {Array(15)
          .fill(true)
          .map((_, i) => {
            return <div key={i} className="h-[37px] rounded-md bg-gray-300" />;
          })}
      </div>
      <div className="flex w-[15%] flex-col justify-between p-2">
        <div className="aspect-square w-12 rounded-md bg-gray-300" />
        <div className="aspect-square w-12 rounded-md bg-gray-300" />
      </div>
    </div>
  );
};

export default TerminologySkeleton;
