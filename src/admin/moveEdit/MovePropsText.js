import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SET_MOVE_PROPS } from "../../mutations/SET_MOVE_PROPS";
import { GET_MOVE_PROPS } from "../../queries/GET_MOVE_PROPS";
import { GET_PUNISHERS } from "../../queries/GET_PUNISHERS";

const MovePropsText = ({
  moveID,
  moveStartup,
  moveHitDmg,
  moveCHDmg,
  moveHit,
  moveCH,
  moveBlock,
}) => {
  const [editing, setEditing] = useState(false);
  const [startup, setStartup] = useState(moveStartup);
  const [damageHit, setDamageHit] = useState(moveHitDmg);
  const [damageCH, setDamageCH] = useState(moveCHDmg);
  const [onHit, setOnHit] = useState(moveHit);
  const [onCH, setOnCH] = useState(moveCH);
  const [onBlock, setOnBlock] = useState(moveBlock);
  const [setProps] = useMutation(SET_MOVE_PROPS, {
    refetchQueries: [GET_MOVE_PROPS, GET_PUNISHERS],
    ignoreResults: true,
  });

  return (
    <div className="grid h-full w-full grid-cols-2">
      {editing ? (
        <div className="relative col-span-2 flex items-center justify-center border-b border-black p-1">
          <h4 className="text-xl font-bold">Properties</h4>
          <div className="absolute inset-y-auto right-1 flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="100%"
              className="max-w-[2rem] cursor-pointer fill-green-600"
              onClick={() => {
                const startupInt = Math.trunc(startup);
                const dmgHitInt = Math.trunc(damageHit);
                const dmgCHInt = Math.trunc(damageCH);
                setProps({
                  variables: {
                    where: {
                      id: moveID,
                    },
                    update: {
                      startup: startupInt,
                      onHit: onHit,
                      onCH: onCH,
                      onBlock: onBlock,
                      damageHit: dmgHitInt,
                      damageCH: dmgCHInt,
                    },
                  },
                });
                //needed bc we changed value in DB without changing the client-side values
                //component isn't being recreated so state isn't reset to current DB values
                setStartup(startupInt);
                setDamageCH(dmgCHInt);
                setDamageHit(dmgHitInt);
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
                setStartup(moveStartup);
                setDamageHit(moveHitDmg);
                setDamageCH(moveCHDmg);
                setOnHit(moveHit);
                setOnCH(moveCH);
                setOnBlock(moveBlock);
                setEditing(false);
              }}
            >
              <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative col-span-2 flex items-center justify-center border-b border-black p-1">
          <h4 className="text-xl font-bold">Properties</h4>
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
      <div className="flex border-b border-r border-black">
        <h6 className="w-1/3 border-r border-black text-center font-bold">
          Startup
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="0"
            step="1"
            value={startup}
            onChange={(e) => {
              if (0 <= e.target.value) setStartup(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value === "") setStartup(moveStartup); //set startup to original value if input is empty
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{`i${moveStartup}`}</h6>
        )}
      </div>
      <div className="flex border-b border-black">
        <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
          OnHit
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="text"
            value={onHit}
            onChange={(e) => setOnHit(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") setOnHit(moveHit);
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{moveHit}</h6>
        )}
      </div>
      <div className="flex border-b border-r border-black">
        <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
          Damage on Hit
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="0"
            step="1"
            value={damageHit}
            onChange={(e) => {
              if (0 <= e.target.value) setDamageHit(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value === "") setDamageHit(moveHitDmg);
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{moveHitDmg}</h6>
        )}
      </div>
      <div className="flex border-b border-black">
        <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
          OnCH
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="text"
            value={onCH}
            onChange={(e) => setOnCH(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") setOnCH(moveCH);
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{moveCH}</h6>
        )}
      </div>
      <div className="flex border-b border-r border-black">
        <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
          Damage on CH
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="number"
            min="0"
            step="1"
            value={damageCH}
            onChange={(e) => {
              if (0 <= e.target.value) setDamageCH(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value === "") setDamageCH(moveCHDmg);
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{moveCHDmg}</h6>
        )}
      </div>
      <div className="flex border-b border-black">
        <h6 className="h-full w-1/3 border-r border-black text-center font-bold">
          OnBlock
        </h6>
        {editing ? (
          <input
            className="w-2/3 text-center"
            type="text"
            value={onBlock}
            onChange={(e) => setOnBlock(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") setOnBlock(moveBlock);
            }}
          />
        ) : (
          <h6 className=" w-2/3 text-center">{moveBlock}</h6>
        )}
      </div>
    </div>
  );
};

export default MovePropsText;
