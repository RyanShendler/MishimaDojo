import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_COMBO_LAUNCHERS } from "../../queries/GET_COMBO_LAUNCHERS";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import ComboLauncherEntry from "./ComboLauncherEntry";
import ComboLauncherPopup from "./ComboLauncherPopup";

const ComboEditLaunchers = ({ comboID, charID }) => {
  const [showPopup, setShowPopup] = useState(false);
  const destroyPopup = () => setShowPopup(false);
  const { data, loading, error } = useQuery(GET_COMBO_LAUNCHERS, {
    variables: {
      where: {
        id: comboID,
      },
    },
  });

  return (
    <div className="p-4">
      <div className="flex flex-row rounded-sm border border-black bg-[#EDF0F5] shadow-md">
        <h5 className="w-1/5 border-r border-black p-2 text-center text-xl font-bold">
          Launchers
        </h5>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : !data.combos.length ? (
          <h3>Combo Not Found</h3>
        ) : (
          <div className="flex w-full space-x-2 p-1">
            {showPopup && (
              <ComboLauncherPopup
                comboID={comboID}
                charID={charID}
                destroyPopup={destroyPopup}
              />
            )}
            {data.combos[0].launchers.map((launcher) => {
              return (
                <ComboLauncherEntry
                  key={launcher.id}
                  comboID={comboID}
                  launcherID={launcher.id}
                  charID={charID}
                  launcherName={launcher.name}
                  launcherInput={launcher.input}
                  launcherType={launcher.launcherForConnection.edges[0].type}
                />
              );
            })}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="100%"
              className="max-w-[2rem] cursor-pointer fill-black"
              onClick={() => setShowPopup(true)}
            >
              <path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboEditLaunchers;
