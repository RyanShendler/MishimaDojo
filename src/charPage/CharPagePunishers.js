import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PUNISHERS } from "../queries/GET_PUNISHERS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPagePunishers = () => {
  const { charID } = useParams();
  const {
    data: standData,
    loading: standLoading,
    error: standError,
  } = useQuery(GET_PUNISHERS, {
    variables: {
      where: {
        id: charID,
      },
      movesWhere2: {
        tags_SOME: {
          tag: "Punisher",
          value: "Standing",
        },
      },
    },
  });
  const {
    data: crouchData,
    loading: crouchLoading,
    error: crouchError,
  } = useQuery(GET_PUNISHERS, {
    variables: {
      where: {
        id: charID,
      },
      movesWhere2: {
        tags_SOME: {
          tag: "Punisher",
          value: "Crouching",
        },
      },
    },
  });
  const {
    data: whiffData,
    loading: whiffLoading,
    error: whiffError,
  } = useQuery(GET_PUNISHERS, {
    variables: {
      where: {
        id: charID,
      },
      movesWhere2: {
        tags_SOME: {
          tag: "Punisher",
          value: "Whiff",
        },
      },
    },
  });

  return (
    <div className="grid w-full grid-cols-3 grid-rows-[auto_minmax(0,1fr)] overflow-y-auto p-2">
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-bold">Standing Punishers</h3>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-bold">Crouching Punishers</h3>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-bold">Whiff Punishers</h3>
      </div>
      <div className="flex justify-center">
        {standLoading ? (
          <div className="flex animate-pulse flex-col space-y-1">
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
          </div>
        ) : standError ? (
          <Error />
        ) : !standData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !standData.characters[0].moves.length ? (
          <h3>No Standing Punishers</h3>
        ) : (
          <ul>
            {standData.characters[0].moves.map((move, index) => {
              return (
                <li key={index}>
                  <div className="inline-flex space-x-1">
                    <p className="font-bold">{`i${move.startup}:`}</p>
                    <p>{`${move.input} (${move.damageHit} dmg)`}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        {crouchLoading ? (
          <div className="flex animate-pulse flex-col space-y-1">
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
          </div>
        ) : crouchError ? (
          <Error />
        ) : !crouchData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !crouchData.characters[0].moves.length ? (
          <h3 className="text-center">No Crouching Punishers</h3>
        ) : (
          <ul>
            {crouchData.characters[0].moves.map((move, index) => {
              return (
                <li key={index}>
                  <div className="inline-flex space-x-1">
                    <p className="font-bold">{`i${move.startup}:`}</p>
                    <p>{`${move.input} (${move.damageHit} dmg)`}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        {whiffLoading ? (
          <div className="flex animate-pulse flex-col space-y-1">
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
            <div className="h-6 w-[160px] rounded-md bg-gray-300" />
          </div>
        ) : whiffError ? (
          <Error />
        ) : !whiffData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !whiffData.characters[0].moves.length ? (
          <h3 className="text-center">No Whiff Punishers</h3>
        ) : (
          <ul>
            {whiffData.characters[0].moves.map((move, index) => {
              return (
                <li key={index}>
                  <div className="inline-flex space-x-1">
                    <p className="font-bold">{`i${move.startup}:`}</p>
                    <p>{`${move.input} (${move.damageHit} dmg)`}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharPagePunishers;
