import { gql } from "@apollo/client";

//get all combo tags not attached to a specific combo
export const GET_NEW_COMBO_TAGS = gql`
  query GET_NEW_COMBO_TAGS($where: ComboTagWhere) {
    comboTags(where: $where) {
      id
      tag
      value
    }
  }
`;

/*
{
  "where": {
    "combos_NONE": {
      "id": null
    }
  }
}
*/
