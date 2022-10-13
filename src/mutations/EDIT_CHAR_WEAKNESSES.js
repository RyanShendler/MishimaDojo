import { gql } from "@apollo/client";

export const EDIT_CHAR_WEAKNESSES = gql`
  mutation EDIT_CHAR_WEAKNESSES(
    $where: CharacterWhere
    $update: CharacterUpdateInput
  ) {
    updateCharacters(where: $where, update: $update) {
      characters {
        weaknesses
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
    "weaknesses": null
  }
}
*/
