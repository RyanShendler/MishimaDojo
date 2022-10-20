import { gql } from "@apollo/client";

export const ADD_COMBO_LAUNCHER = gql`
  mutation ADD_COMBO_LAUNCHER($where: ComboWhere, $connect: ComboConnectInput) {
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
    "launchers": [
      {
        "where": {
          "node": {
            "id": null
          }
        },
        "connect": [
          {
            "tags": [
              {
                "where": {
                  "node": {
                    "tag": "Launcher",
                    "value": null
                  }
                }
              }
            ]
          }
        ],
        "edge": {
          "type": null
        }
      }
    ]
  }
}
*/
