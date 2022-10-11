import { gql } from "@apollo/client";

export const DELETE_MOVE_TAG = gql`
  mutation DELETE_MOVE_TAG($where: MoveTagWhere) {
    deleteMoveTags(where: $where) {
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
