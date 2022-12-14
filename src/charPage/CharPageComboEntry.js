import { useQuery } from "@apollo/client";
import { GET_COMBO_INPUTS } from "../queries/GET_COMBO_INPUTS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageComboEntry = ({
  comboID,
  comboName,
  comboTags,
  comboLaunchers,
}) => {
  const {
    data: inputData,
    loading: inputLoading,
    error: inputError,
  } = useQuery(GET_COMBO_INPUTS, {
    variables: {
      comboId: comboID,
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
          {!comboLaunchers.length ? (
            <h4>No Launchers</h4>
          ) : (
            <h4>
              {comboLaunchers.reduce((prev, cur) => {
                return !prev ? cur.input : prev + " " + cur.input;
              }, "")}
            </h4>
          )}
        </div>
      </div>
      <div className="ml-2 flex">
        <h4>Tags: </h4>
        <div>
          {!comboTags.length ? (
            <h4>No Tags</h4>
          ) : (
            <h4>
              {comboTags.reduce((prev, cur) => {
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
