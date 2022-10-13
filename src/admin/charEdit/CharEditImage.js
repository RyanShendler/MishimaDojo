import { useState } from "react";
import EditImagePopup from "./EditImagePopup";

const CharEditImage = ({ charID, charImage }) => {
  const [showPopup, setShowPopup] = useState(false);
  const destroyPopup = () => setShowPopup(false);

  return (
    <div>
      {showPopup && (
        <EditImagePopup
          charID={charID}
          charImage={charImage}
          destroyPopup={destroyPopup}
        />
      )}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5rem"
          viewBox="0 0 48 48"
          className="absolute top-0 right-0 z-10 hover:cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
        </svg>
        <img src={charImage} alt="Character Image" />
      </div>
    </div>
  );
};

export default CharEditImage;
