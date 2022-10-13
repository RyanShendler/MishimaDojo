import { gql } from "@apollo/client";

export const EDIT_CHAR_STRENGTHS = gql`
  mutation EDIT_CHAR_STRENGTHS(
    $where: CharacterWhere
    $update: CharacterUpdateInput
  ) {
    updateCharacters(where: $where, update: $update) {
      characters {
        strengths
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
    "strengths": null
  }
}
*/
