//charTier is an object with keys id and value
const CharEditDifficulty = ({ charID, charDifficulty }) => {
  return (
    <div className="flex">
      <h6 className="w-full pr-1">{charDifficulty.value}</h6>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="100%"
        className="max-w-[1.5rem] cursor-pointer fill-black"
      >
        <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
      </svg>
    </div>
  );
};

export default CharEditDifficulty;
