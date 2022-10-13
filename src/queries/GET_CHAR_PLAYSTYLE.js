import { gql } from "@apollo/client";

//get a specific character tag for a specific character
export const GET_CHAR_PLAYSTYLE = gql`
  query GET_CHAR_PLAYSTYLE(
    $where: CharacterWhere
    $tagsWhere2: CharacterTagWhere
  ) {
    characters(where: $where) {
      tags(where: $tagsWhere2) {
        id
        value
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "tagsWhere2": {
    "tag": "Playstyle"
  }
}
*/
