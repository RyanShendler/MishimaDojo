import { gql } from "@apollo/client";

export const DELETE_COMBO = gql`
  mutation DELETE_COMBO($where: ComboWhere) {
    deleteCombos(where: $where) {
      relationshipsDeleted
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
