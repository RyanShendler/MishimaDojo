import { gql } from "@apollo/client";

export const REMOVE_MOVE_TAG = gql`
  mutation REMOVE_MOVE_TAG(
    $where: MoveWhere
    $disconnect: MoveDisconnectInput
  ) {
    updateMoves(where: $where, disconnect: $disconnect) {
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
