import InputArrowEntry from "./InputArrowEntry";

//use MouseOver and MouseOut
const InputArrows = () => {
  return (
    <div className="flex w-1/4 flex-col items-center space-y-4">
      <h2 className="whitespace-nowrap text-2xl font-bold">
        {"Inputs(when facing right)"}
      </h2>
      <div className="grid w-[90%] grid-cols-3 grid-rows-3 gap-6">
        <InputArrowEntry direction="Up-Back" notation="ub" />
        <InputArrowEntry direction="Up" notation="u" />
        <InputArrowEntry direction="Up-Forward" notation="uf" />
        <InputArrowEntry direction="Back" notation="b" />
        <InputArrowEntry direction="Neutral" notation="N" />
        <InputArrowEntry direction="Forward" notation="f" />
        <InputArrowEntry direction="Down-Back" notation="db" />
        <InputArrowEntry direction="Down" notation="d" />
        <InputArrowEntry direction="Down-Forward" notation="df" />
      </div>
    </div>
  );
};

export default InputArrows;
