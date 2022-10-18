import { gql } from "@apollo/client";

export const GET_COMBO_HEADER = gql`
  query GET_COMBO_HEADER($where: ComboWhere) {
    combos(where: $where) {
      name
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
