import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EDIT_CHAR_IMAGE } from "../../mutations/EDIT_CHAR_IMAGE";
import { GET_CHAR_IMAGE } from "../../queries/GET_CHAR_IMAGE";
import { GET_CHAR_LIST } from "../../queries/GET_CHAR_LIST";
import { GET_TIER_CHARS } from "../../queries/GET_TIER_CHARS";

const EditImagePopup = ({ charID, charImage, destroyPopup }) => {
  const [image, setImage] = useState(charImage);
  const [editImage] = useMutation(EDIT_CHAR_IMAGE, {
    refetchQueries: [GET_CHAR_LIST, GET_CHAR_IMAGE, GET_TIER_CHARS],
    ignoreResults: true,
  });

  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const popupRoot = document.getElementById("popup");
    popupRoot.appendChild(elRef.current);
    return () => popupRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="absolute flex justify-center rounded-md bg-gray-200 p-2 shadow-lg">
        <form
          className="flex flex-col items-center justify-evenly space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            editImage({
              variables: {
                where: {
                  id: charID,
                },
                update: {
                  imageURL: image,
                },
              },
            });
            destroyPopup();
          }}
        >
          <h2 className="text-xl">Edit Image URL</h2>
          <input
            type="text"
            className="rounded-md p-1 shadow-md"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <div className="flex items-center justify-evenly space-x-2">
            <input
              className="rounded-md bg-green-600 p-1 text-lg text-white hover:cursor-pointer"
              type="submit"
              value="Save Changes"
            />
            <button
              className="rounded-md bg-red-600 p-1 text-lg text-white"
              onClick={() => destroyPopup()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    elRef.current
  );
};

export default EditImagePopup;
