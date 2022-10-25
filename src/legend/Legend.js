import InputArrows from "./InputArrows";
import Terminology from "./Terminology";

const Legend = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex w-[66%] flex-col items-center rounded-md border border-black bg-content shadow-md">
        <div className="flex w-full items-center justify-center bg-header p-2">
          <h1 className="text-4xl text-[#F1F5F9]">Legend</h1>
        </div>
        <div className="flex w-full flex-row justify-around p-4">
          <InputArrows />
          <Terminology />
        </div>
      </div>
    </div>
  );
};

export default Legend;
