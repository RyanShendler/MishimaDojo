import { gql } from "@apollo/client";

export const ADD_MOVE_TAG = gql`
  mutation ADD_MOVE_TAG($where: MoveWhere, $connect: MoveConnectInput) {
    updateMoves(where: $where, connect: $connect) {
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
