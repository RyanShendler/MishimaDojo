import { useQuery } from "@apollo/client";
import { GET_COMBO_INPUTS } from "../queries/GET_COMBO_INPUTS";
import { GET_COMBO_LAUNCHERS } from "../queries/GET_COMBO_LAUNCHERS";
import { GET_COMBO_TAGS } from "../queries/GET_COMBO_TAGS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageComboEntry = ({ comboID, comboName }) => {
  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery(GET_COMBO_TAGS, {
    variables: {
      where: {
        id: comboID,
      },
    },
  });
  const {
    data: inputData,
    loading: inputLoading,
    error: inputError,
  } = useQuery(GET_COMBO_INPUTS, {
    variables: {
      comboId: comboID,
    },
  });
  const {
    data: launchData,
    loading: launchLoading,
    error: launchError,
  } = useQuery(GET_COMBO_LAUNCHERS, {
    variables: {
      where: {
        id: comboID,
      },
    },
  });

  return (
    <div className="mb-1 flex flex-col">
      <div className="flex">
        <h3 className="underline">{`${comboName}:`}</h3>
        <div>
          {inputLoading ? (
            <Loading />
          ) : inputError ? (
            <Error />
          ) : !inputData.getInputs.length ? (
            <h4>No Inputs</h4>
          ) : (
            <h4>
              {inputData.getInputs
                .reduce((prev, cur) => {
                  return !prev ? cur.input : prev + " -> " + cur.input;
                }, "")
                .toLowerCase()}
            </h4>
          )}
        </div>
      </div>
      <div className="ml-2 flex">
        <h4 className="">Launchers: </h4>
        <div>
          {launchLoading ? (
            <Loading />
          ) : launchError ? (
            <Error />
          ) : !launchData.combos[0].launchers.length ? (
            <h4>No Launchers</h4>
          ) : (
            <h4>
              {launchData.combos[0].launchers.reduce((prev, cur) => {
                return !prev ? cur.input : prev + " " + cur.input;
              }, "")}
            </h4>
          )}
        </div>
      </div>
      <div className="ml-2 flex">
        <h4>Tags: </h4>
        <div>
          {tagLoading ? (
            <Loading />
          ) : tagError ? (
            <Error />
          ) : !tagData.combos[0].tags.length ? (
            <h4>No Tags</h4>
          ) : (
            <h4>
              {tagData.combos[0].tags.reduce((prev, cur) => {
                return !prev ? cur.value : prev + ", " + cur.value;
              }, "")}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharPageComboEntry;
