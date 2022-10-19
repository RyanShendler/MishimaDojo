import { gql } from "@apollo/client";

export const ADD_COMBO_TAG = gql`
  mutation ADD_COMBO_TAG($where: ComboWhere, $connect: ComboConnectInput) {
    updateCombos(where: $where, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "connect": {
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
