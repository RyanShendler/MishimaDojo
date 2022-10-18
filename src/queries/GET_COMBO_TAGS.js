import { gql } from "@apollo/client";

export const GET_COMBO_TAGS = gql`
  query GET_COMBO_TAGS($where: ComboWhere) {
    combos(where: $where) {
      tags {
        id
        tag
        value
      }
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
