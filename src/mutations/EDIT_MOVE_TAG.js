import { gql } from "@apollo/client";

export const EDIT_MOVE_TAG = gql`
  mutation EDIT_MOVE_TAG($where: MoveTagWhere, $update: MoveTagUpdateInput) {
    updateMoveTags(where: $where, update: $update) {
      moveTags {
        id
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
    "tag": null,
    "value": null
  }
}
 */
