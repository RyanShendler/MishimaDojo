import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAR_COMBO } from "../queries/GET_CHAR_COMBO";
import Error from "../utility/Error";
import Loading from "../utility/Loading";
import CharPageComboEntry from "./CharPageComboEntry";

const CharPageCombos = () => {
  const { charID } = useParams();
  const {
    data: fullData,
    loading: fullLoading,
    error: fullError,
  } = useQuery(GET_CHAR_COMBO, {
    variables: {
      where: {
        id: charID,
      },
      combosWhere2: {
        tags_SOME: {
          tag: "Type",
          value: "Full Combo",
        },
      },
    },
  });
  const {
    data: miniData,
    loading: miniLoading,
    error: miniError,
  } = useQuery(GET_CHAR_COMBO, {
    variables: {
      where: {
        id: charID,
      },
      combosWhere2: {
        tags_SOME: {
          tag: "Type",
          value: "Mini-Combo",
        },
      },
    },
  });
  const {
    data: wallData,
    loading: wallLoading,
    error: wallError,
  } = useQuery(GET_CHAR_COMBO, {
    variables: {
      where: {
        id: charID,
      },
      combosWhere2: {
        tags_SOME: {
          tag: "Type",
          value: "Wall Combo",
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col overflow-y-auto p-2">
      <div className="mb-2 flex flex-col">
        <h3 className="text-xl font-bold">Combos</h3>
        {fullLoading ? (
          <Loading />
        ) : fullError ? (
          <Error />
        ) : !fullData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !fullData.characters[0].combos.length ? (
          <h3 className="indent-2">No Combos</h3>
        ) : (
          <ul className="list-inside indent-2">
            {fullData.characters[0].combos.map((combo) => {
              return (
                <CharPageComboEntry
                  key={combo.id}
                  comboID={combo.id}
                  comboName={combo.name}
                  comboLaunchers={combo.launchers}
                  comboTags={combo.tags}
                />
              );
            })}
          </ul>
        )}
      </div>
      <div className="mb-2 flex flex-col">
        <h3 className="text-xl font-bold">Mini-Combos</h3>
        {miniLoading ? (
          <Loading />
        ) : miniError ? (
          <Error />
        ) : !miniData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !miniData.characters[0].combos.length ? (
          <h3 className="indent-2">No Mini-Combos</h3>
        ) : (
          <ul className="list-inside indent-2">
            {miniData.characters[0].combos.map((combo) => {
              return (
                <CharPageComboEntry
                  key={combo.id}
                  comboID={combo.id}
                  comboName={combo.name}
                  comboLaunchers={combo.launchers}
                  comboTags={combo.tags}
                />
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">Wall Combos</h3>
        {wallLoading ? (
          <Loading />
        ) : wallError ? (
          <Error />
        ) : !wallData.characters.length ? (
          <h3>Character Not Found</h3>
        ) : !wallData.characters[0].combos.length ? (
          <h3 className="indent-2">No Wall Combos</h3>
        ) : (
          <ul className="list-inside indent-2">
            {wallData.characters[0].combos.map((combo) => {
              return (
                <CharPageComboEntry
                  key={combo.id}
                  comboID={combo.id}
                  comboName={combo.name}
                  comboLaunchers={combo.launchers}
                  comboTags={combo.tags}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharPageCombos;
