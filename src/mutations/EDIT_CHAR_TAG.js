import { gql } from "@apollo/client";

export const EDIT_CHAR_TAG = gql`
  mutation EDIT_CHAR_TAG(
    $where: CharacterTagWhere
    $update: CharacterTagUpdateInput
  ) {
    updateCharacterTags(where: $where, update: $update) {
      characterTags {
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
