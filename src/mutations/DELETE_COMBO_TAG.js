import { gql } from "@apollo/client";

export const DELETE_COMBO_TAG = gql`
  mutation DELETE_COMBO_TAG($where: ComboTagWhere) {
    deleteComboTags(where: $where) {
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
