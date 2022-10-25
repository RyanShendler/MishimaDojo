import { useState } from "react";
import CharSearchParams from "./CharSearchParams";
import MoveSearchParams from "./MoveSearchParams";

const Search = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex w-[66%] flex-col items-center rounded-md border border-black bg-content shadow-md">
        <div className="flex w-full items-center justify-center bg-header p-2">
          <h1 className="text-4xl text-[#F1F5F9]">Search</h1>
        </div>
        <label className="w-1/3 p-2 text-center text-xl">
          Category
          <select
            className="ml-2 min-w-[40%]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""} />
            <option value={"Character"}>Character</option>
            <option value={"Move"}>Move</option>
          </select>
        </label>
        {category === "Character" ? (
          <CharSearchParams />
        ) : category === "Move" ? (
          <MoveSearchParams />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Search;
