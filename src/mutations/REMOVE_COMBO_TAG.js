import { gql } from "@apollo/client";

export const REMOVE_COMBO_TAG = gql`
  mutation REMOVE_COMBO_TAG(
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
    "tags": [
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
