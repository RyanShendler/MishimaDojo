import { gql } from "@apollo/client";

export const REMOVE_STANCE_MOVE = gql`
  mutation REMOVE_STANCE_MOVE(
    $where: StanceWhere
    $disconnect: StanceDisconnectInput
  ) {
    updateStances(where: $where, disconnect: $disconnect) {
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
    "moves": [
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
