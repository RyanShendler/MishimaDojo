import { gql } from "@apollo/client";

export const SET_COMBO_HEADER = gql`
  mutation SET_COMBO_HEADER($where: ComboWhere, $update: ComboUpdateInput) {
    updateCombos(where: $where, update: $update) {
      combos {
        name
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
    "name": null
  }
}
*/
