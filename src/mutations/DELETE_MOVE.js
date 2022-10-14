import { gql } from "@apollo/client";

export const DELETE_MOVE = gql`
  mutation DELETE_MOVE($where: MoveWhere) {
    deleteMoves(where: $where) {
      nodesDeleted
    }
  }
`;

/*
{
  "where": {
    "id": null
  }
}
*/
