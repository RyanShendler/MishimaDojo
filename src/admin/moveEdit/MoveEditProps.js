const MoveEditProps = () => {
  return (
    <div className="w-2/3">
      <div className="grid h-full w-full grid-cols-2">
        <div className="relative col-span-2 flex items-center justify-center border-b border-black p-1">
          <h4 className="text-xl font-bold">Properties</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="absolute inset-y-auto right-1 max-w-[2rem] cursor-pointer"
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </div>
        <div className="border-b border-r border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            Startup
          </h6>
          <div className="w-2/3"></div>
        </div>
        <div className="border-b border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            OnHit
          </h6>
          <div className="w-2/3"></div>
        </div>
        <div className="border-b border-r border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            Damage on Hit
          </h6>
          <div className="w-2/3"></div>
        </div>
        <div className="border-b border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            OnCH
          </h6>
          <div className="w-2/3"></div>
        </div>
        <div className="border-b border-r border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            Damage on CH
          </h6>
          <div className="w-2/3"></div>
        </div>
        <div className="border-b border-black">
          <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
            OnBlock
          </h6>
          <div className="w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default MoveEditProps;
