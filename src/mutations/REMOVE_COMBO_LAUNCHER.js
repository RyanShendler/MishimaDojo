import { gql } from "@apollo/client";

export const REMOVE_COMBO_LAUNCHER = gql`
  mutation REMOVE_COMBO_LAUNCHER(
    $where: ComboWhere
    $disconnect: ComboDisconnectInput
  ) {
    updateCombos(where: $where, disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "disconnect": {
    "launchers": [
      {
        "where": {
          "node": {
            "id": null
          }
        }
      }
    ]
  }
}
*/
