import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_DUMMY } from "../mutations/CREATE_DUMMY";
import { DELETE_DUMMY } from "../mutations/DELETE_DUMMY";
import { GET_RECOMMENDED_CHAR } from "../queries/GET_RECOMMENDED_CHAR";
import Error from "../utility/Error";
import RecommendedChar from "./RecommendedChar";
import UserRating from "./UserRating";

const CharacterRecommendation = () => {
  const [poke, setPoke] = useState(3);
  const [whiff, setWhiff] = useState(3);
  const [pressure, setPressure] = useState(3);
  const [mixup, setMixup] = useState(3);
  const [keepout, setKeepout] = useState(3);
  const [defense, setDefense] = useState(3);
  const [createDummy] = useMutation(CREATE_DUMMY, {
    ignoreResults: true,
    onCompleted() {
      getRecommendedChar();
    },
  });
  const [getRecommendedChar, { called, loading, error, data }] = useLazyQuery(
    GET_RECOMMENDED_CHAR,
    {
      fetchPolicy: "no-cache",
      onCompleted() {
        deleteDummy();
      },
    }
  );
  const [deleteDummy] = useMutation(DELETE_DUMMY, {
    variables: {
      where: {
        name: "Test",
      },
    },
    ignoreResults: true,
  });

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex w-[66%] flex-col rounded-md border border-black bg-content shadow-md">
        <div className="flex w-full items-center justify-center bg-header p-2">
          <h1 className="text-4xl text-[#F1F5F9]">Character Recommendation</h1>
        </div>
        {!called ? (
          <div className="flex flex-col items-center p-4">
            <h3 className="text-center text-2xl font-bold">
              Describe Your Playstyle
            </h3>
            <div className="flex w-4/5 flex-row justify-around space-x-6 p-2">
              <div className="flex w-1/2 flex-col">
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">Poke:</h6>
                  <label htmlFor="poke" className="mr-1 text-sm font-semibold">
                    Not Important
                  </label>
                  <input
                    id="poke"
                    type="range"
                    min="1"
                    max="5"
                    value={poke}
                    onChange={(e) => {
                      setPoke(parseInt(e.target.value));
                    }}
                  />
                  <label htmlFor="poke" className="ml-1 text-sm font-semibold">
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle focuses on whittling down your opponent's
                  health with many quick, safe moves
                </p>
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">Keepout:</h6>
                  <label
                    htmlFor="keepout"
                    className="mr-1 text-sm font-semibold"
                  >
                    Not Important
                  </label>
                  <input
                    id="keepout"
                    type="range"
                    min="1"
                    max="5"
                    value={keepout}
                    onChange={(e) => {
                      setKeepout(parseInt(e.target.value));
                    }}
                  />
                  <label
                    htmlFor="keepout"
                    className="ml-1 text-sm font-semibold"
                  >
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle prioritizes keeping your opponent at bay with
                  long-range space control moves
                </p>
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">Defense:</h6>
                  <label
                    htmlFor="defense"
                    className="mr-1 text-sm font-semibold"
                  >
                    Not Important
                  </label>
                  <input
                    input="defense"
                    type="range"
                    min="1"
                    max="5"
                    value={defense}
                    onChange={(e) => {
                      setDefense(parseInt(e.target.value));
                    }}
                  />
                  <label
                    htmlFor="defense"
                    className="ml-1 text-sm font-semibold"
                  >
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle favors reactive players who like to disrupt
                  their opponent's offense with parries, evasive moves, etc.
                  instead of going on the offense themselves
                </p>
              </div>
              <div className="flex w-1/2 flex-col">
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">
                    Pressure:
                  </h6>
                  <label
                    htmlFor="pressure"
                    className="mr-1 text-sm font-semibold"
                  >
                    Not Important
                  </label>
                  <input
                    id="pressure"
                    type="range"
                    min="1"
                    max="5"
                    value={pressure}
                    onChange={(e) => {
                      setPressure(parseInt(e.target.value));
                    }}
                  />
                  <label
                    htmlFor="presure"
                    className="ml-1 text-sm font-semibold"
                  >
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle suffocates your opponent in a barrage of quick
                  pokes and dangerous CH moves, making it hard for them to know
                  when to block and when to fight back
                </p>
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">Mixup:</h6>
                  <label htmlFor="mixup" className="mr-1 text-sm font-semibold">
                    Not Important
                  </label>
                  <input
                    id="mixup"
                    type="range"
                    min="1"
                    max="5"
                    value={mixup}
                    onChange={(e) => {
                      setMixup(parseInt(e.target.value));
                    }}
                  />
                  <label htmlFor="mixup" className="ml-1 text-sm font-semibold">
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle unleashes an onslaught of 50/50 mixups, forcing
                  the opponent to either guess right or take a huge chunk of
                  damage
                </p>
                <div className="flex flex-row items-center">
                  <h6 className="mr-4 text-lg font-bold underline">
                    Whiff Punish:
                  </h6>
                  <label htmlFor="whiff" className="mr-1 text-sm font-semibold">
                    Not Important
                  </label>
                  <input
                    id="whiff"
                    type="range"
                    min="1"
                    max="5"
                    value={whiff}
                    onChange={(e) => {
                      setWhiff(parseInt(e.target.value));
                    }}
                  />
                  <label htmlFor="whiff" className="ml-1 text-sm font-semibold">
                    Important
                  </label>
                </div>
                <p className="ml-4 mb-1 whitespace-pre-wrap">
                  This playstyle uses strong movement to bait the enemy into
                  missing attacks, and then punishes them for their mistake
                </p>
              </div>
            </div>
            <button
              className="rounded-md bg-green-600 p-1 text-lg text-white shadow-md"
              onClick={() => {
                createDummy({
                  variables: {
                    input: [
                      {
                        name: "Test",
                        imageURL: "",
                        summary: "",
                        poke: poke,
                        keepout: keepout,
                        mixup: mixup,
                        pressure: pressure,
                        defense: defense,
                        whiffPunish: whiff,
                        strengths: [],
                        weaknesses: [],
                      },
                    ],
                  },
                });
              }}
            >
              Submit
            </button>
          </div>
        ) : loading ? (
          <div className="flex w-full items-center justify-center p-4">
            <div className="h-[120px] w-2/3 animate-pulse rounded-md bg-gray-300" />
          </div>
        ) : error ? (
          <Error />
        ) : (
          <RecommendedChar
            charID={data.getRecommendedChar.id}
            charImage={data.getRecommendedChar.image}
            similarity={data.getRecommendedChar.similarity}
            charName={data.getRecommendedChar.name}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterRecommendation;
