import { gql } from "@apollo/client";

export const SET_MOVE_HEADER = gql`
  mutation Mutation($where: MoveWhere, $update: MoveUpdateInput) {
    updateMoves(where: $where, update: $update) {
      moves {
        name
        input
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "update": {
    "name": null,
    "input": null
  }
}
*/
