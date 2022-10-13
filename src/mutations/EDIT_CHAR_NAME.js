import { gql } from "@apollo/client";

export const EDIT_CHAR_NAME = gql`
  mutation EDIT_CHAR_NAME(
    $where: CharacterWhere
    $update: CharacterUpdateInput
  ) {
    updateCharacters(where: $where, update: $update) {
      characters {
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
