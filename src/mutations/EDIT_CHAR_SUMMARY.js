import { gql } from "@apollo/client";

export const EDIT_CHAR_SUMMARY = gql`
  mutation EDIT_CHAR_SUMMARY(
    $where: CharacterWhere
    $update: CharacterUpdateInput
  ) {
    updateCharacters(where: $where, update: $update) {
      characters {
        summary
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
    "summary": null
  }
}
*/
