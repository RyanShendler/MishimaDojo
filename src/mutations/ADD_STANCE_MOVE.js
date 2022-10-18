import { gql } from "@apollo/client";

export const ADD_STANCE_MOVE = gql`
  mutation ADD_STANCE_MOVE($where: StanceWhere, $connect: StanceConnectInput) {
    updateStances(where: $where, connect: $connect) {
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
