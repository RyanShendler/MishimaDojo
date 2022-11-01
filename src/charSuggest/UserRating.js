const UserRating = ({ rating, setRating }) => {
  return (
    <div className="flex flex-row space-x-1">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className="max-w-[1.5rem] cursor-pointer fill-yellow-500 stroke-black stroke-[3px]"
          onClick={() => setRating(1)}
        >
          <path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z" />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className={`max-w-[1.5rem] cursor-pointer stroke-black stroke-[3px] ${
            rating >= 2 ? "fill-yellow-500" : "fill-transparent"
          }`}
          onClick={() => setRating(2)}
        >
          <path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z" />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className={`max-w-[1.5rem] cursor-pointer stroke-black stroke-[3px] ${
            rating >= 3 ? "fill-yellow-500" : "fill-transparent"
          }`}
          onClick={() => setRating(3)}
        >
          <path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z" />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className={`max-w-[1.5rem] cursor-pointer stroke-black stroke-[3px] ${
            rating >= 4 ? "fill-yellow-500" : "fill-transparent"
          }`}
          onClick={() => setRating(4)}
        >
          <path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z" />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="100%"
          className={`max-w-[1.5rem] cursor-pointer stroke-black stroke-[3px] ${
            rating === 5 ? "fill-yellow-500" : "fill-transparent"
          }`}
          onClick={() => setRating(5)}
        >
          <path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z" />
        </svg>
      </div>
    </div>
  );
};

export default UserRating;
