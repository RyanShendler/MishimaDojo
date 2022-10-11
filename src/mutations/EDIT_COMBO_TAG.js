import { gql } from "@apollo/client";

export const EDIT_COMBO_TAG = gql`
  mutation EDIT_COMBO_TAG($where: ComboTagWhere, $update: ComboTagUpdateInput) {
    updateComboTags(where: $where, update: $update) {
      comboTags {
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
