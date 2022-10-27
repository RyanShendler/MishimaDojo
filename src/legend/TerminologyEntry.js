import { useState } from "react";

const TerminologyEntry = ({ name, description }) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      className="ml-4 mb-4 inline-flex w-1/4 flex-col items-center justify-center overflow-clip rounded-md border border-black bg-[#EDF0F5] shadow-md"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <h4 className="-mb-[1px] w-full border-b border-black p-1 text-center text-xl font-bold">
        {name}
      </h4>
      {showDescription && (
        <p className="whitespace-pre-wrap break-words p-1 text-center">
          {description}
        </p>
      )}
    </div>
  );
};

export default TerminologyEntry;
