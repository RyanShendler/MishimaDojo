import { useState } from "react";

const InputArrowEntry = ({ direction, notation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      {showPopup && (
        <h5 className="absolute whitespace-nowrap rounded-md bg-[#EDF0F5] p-1 text-center shadow-md">
          {`${direction} (${notation})`}
        </h5>
      )}
      <div
        className={`h-full w-full animate-pulse rounded-md bg-gray-300 ${
          imgLoading ? "inline" : "hidden"
        }`}
      />
      <img
        className={`${imgLoading ? "hidden" : "inline"}`}
        src={`assets/inputs/${direction.toLowerCase()}.svg`}
        width="100%"
        height="100%"
        onLoad={() => setImgLoading(false)}
      />
    </div>
  );
};

export default InputArrowEntry;
