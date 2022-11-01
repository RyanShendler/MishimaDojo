const TierListSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col items-center p-4">
      {Array(5)
        .fill(true)
        .map((_, i) => {
          return (
            <div
              key={i}
              className="flex flex-row items-center rounded-md bg-gray-200 p-2"
            >
              <div className="m-4 h-[32px] w-[95px] rounded-md bg-gray-300" />
              {Array(8)
                .fill(true)
                .map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="ml-2 h-[102px] w-[66px] rounded-md bg-gray-300"
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default TierListSkeleton;
