import { gql } from "@apollo/client";

export const EDIT_CHAR_IMAGE = gql`
  mutation EDIT_CHAR_IMAGE(
    $where: CharacterWhere
    $update: CharacterUpdateInput
  ) {
    updateCharacters(where: $where, update: $update) {
      characters {
        imageURL
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
    "imageURL": null
  }
}
*/
