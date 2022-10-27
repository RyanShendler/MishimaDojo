import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_COMBO_LAUNCHER } from "../../mutations/REMOVE_COMBO_LAUNCHER";
import { GET_CHAR_COMBO } from "../../queries/GET_CHAR_COMBO";
import { GET_COMBO_LAUNCHERS } from "../../queries/GET_COMBO_LAUNCHERS";
import { GET_NEW_LAUNCHERS } from "../../queries/GET_NEW_LAUNCHERS";

const ComboLauncherEntry = ({
  comboID,
  charID,
  launcherID,
  launcherName,
  launcherInput,
  launcherType,
}) => {
  const [removeLauncher] = useMutation(REMOVE_COMBO_LAUNCHER, {
    refetchQueries: [GET_COMBO_LAUNCHERS, GET_NEW_LAUNCHERS, GET_CHAR_COMBO],
    ignoreResults: true,
  });
  return (
    <div className="flex space-x-1 rounded-md border border-black p-1 px-1 shadow-md">
      <div className="flex flex-col items-center justify-evenly">
        <h5 className="text-lg font-bold">{launcherName}</h5>
        <h5>{launcherInput}</h5>
        <h5>{launcherType}</h5>
      </div>
      <div className="flex flex-col items-center justify-evenly">
        <Link to={`/admin/characters/${charID}/moves/${launcherID}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 48 48"
            className="max-w-[1.75rem] cursor-pointer"
          >
            <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z" />
          </svg>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 48 48"
          className="max-w-[2rem] cursor-pointer fill-red-600"
          onClick={() => {
            removeLauncher({
              variables: {
                where: {
                  id: comboID,
                },
                disconnect: {
                  launchers: [
                    {
                      where: {
                        node: {
                          id: launcherID,
                        },
                      },
                    },
                  ],
                },
              },
            });
          }}
        >
          <path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
        </svg>
      </div>
    </div>
  );
};

export default ComboLauncherEntry;
