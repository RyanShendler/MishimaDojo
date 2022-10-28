import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SET_RATINGS } from "../../mutations/SET_RATINGS";
import { GET_CHAR_HEADER } from "../../queries/GET_CHAR_HEADER";
import { GET_RATINGS } from "../../queries/GET_RATINGS";

const CharRatingText = ({
  charKeepout,
  charPoke,
  charDefense,
  charMixup,
  charWhiff,
  charPressure,
  charID,
}) => {
  const [setRatings] = useMutation(SET_RATINGS, {
    refetchQueries: [GET_RATINGS, GET_CHAR_HEADER],
    ignoreResults: true,
  });
  const [editing, setEditing] = useState(false);
  const [keepout, setKeepout] = useState(charKeepout);
  const [poke, setPoke] = useState(charPoke);
  const [defense, setDefense] = useState(charDefense);
  const [whiff, setWhiff] = useState(charWhiff);
  const [pressure, setPressure] = useState(charPressure);
  const [mixup, setMixup] = useState(charMixup);

  return (
    <div className="grid w-full grid-cols-2">
      {editing ? (
        <div className="relative col-span-2 flex items-center justify-center border-b border-black p-1">
          <h4 className="text-xl font-bold">Archetype</h4>
          <div className="absolute inset-y-auto right-1 flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="100%"
              className="max-w-[2rem] cursor-pointer fill-green-600"
              onClick={() => {
                const pokeInt =
                  poke >= 1 && poke <= 5 ? Math.trunc(poke) : charPoke;
                const mixupInt =
                  mixup >= 1 && mixup <= 5 ? Math.trunc(mixup) : charMixup;
                const keepoutInt =
                  keepout >= 1 && keepout <= 5
                    ? Math.trunc(keepout)
                    : charKeepout;
                const defenseInt =
                  defense >= 1 && defense <= 5
                    ? Math.trunc(defense)
                    : charDefense;
                const pressureInt =
                  pressure >= 1 && pressure <= 5
                    ? Math.trunc(pressure)
                    : charPressure;
                const whiffInt =
                  whiff >= 1 && whiff <= 5 ? Math.trunc(whiff) : charWhiff;
                setRatings({
                  variables: {
                    where: {
                      id: charID,
                    },
                    update: {
                      poke: pokeInt,
                      keepout: keepoutInt,
                      mixup: mixupInt,
                      pressure: pressureInt,
                      defense: defenseInt,
                      whiffPunish: whiffInt,
                    },
                  },
                });
                setDefense(defenseInt);
                setKeepout(keepoutInt);
                setMixup(mixupInt);
                setPressure(pressureInt);
                setPoke(pokeInt);
                setKeepout(keepoutInt);
                setEditing(false);
              }}
            >
              <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="100%"
              className="max-w-[2rem] cursor-pointer fill-red-600"
              onClick={() => {
                setDefense(charDefense);
                setKeepout(charKeepout);
                setMixup(charMixup);
                setPoke(charPoke);
                setPressure(charPressure);
                setWhiff(charWhiff);
                setEditing(false);
              }}
            >
              <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative col-span-2 flex items-center justify-center border-b border-black p-1">
          <h4 className="text-xl font-bold">Archetype</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="100%"
            className="absolute inset-y-auto right-1 max-w-[2rem] cursor-pointer"
            onClick={() => setEditing(true)}
          >
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </div>
      )}
      <div className="flex items-center border-b border-black">
        <div className="flex h-full w-1/3 items-center justify-center border-r border-black">
          <h6 className="text-center font-bold">Poke</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={poke}
            onChange={(e) => {
              setPoke(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charPoke}</h6>
        )}
      </div>
      <div className="flex items-center border-b border-black">
        <div className="flex h-full w-1/3 items-center justify-center border-x border-black">
          <h6 className="text-center font-bold">Keepout</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={keepout}
            onChange={(e) => {
              setKeepout(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charKeepout}</h6>
        )}
      </div>
      <div className="flex items-center border-b border-black">
        <div className="flex h-full w-1/3 items-center justify-center border-r border-black">
          <h6 className="text-center font-bold">Pressure</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={pressure}
            onChange={(e) => {
              setPressure(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charPressure}</h6>
        )}
      </div>
      <div className="flex items-center border-b border-black">
        <div className="flex h-full w-1/3 items-center justify-center border-x border-black">
          <h6 className="text-center font-bold">Mixup</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={mixup}
            onChange={(e) => {
              setMixup(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charMixup}</h6>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex h-full w-1/3 items-center justify-center border-r border-black">
          <h6 className="text-center font-bold">Defense</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={defense}
            onChange={(e) => {
              setDefense(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charDefense}</h6>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex h-full w-1/3 items-center justify-center border-x border-black">
          <h6 className="text-center font-bold">Whiff Punish</h6>
        </div>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="1"
            max="5"
            value={whiff}
            onChange={(e) => {
              setWhiff(e.target.value);
            }}
          />
        ) : (
          <h6 className="w-2/3 text-center">{charWhiff}</h6>
        )}
      </div>
    </div>
  );
};

export default CharRatingText;
