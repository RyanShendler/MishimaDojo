import { gql } from "@apollo/client";

export const GET_CHAR_HEADER = gql`
  query GET_CHAR_HEADER(
    $where: CharacterWhere
    $tagsWhere2: CharacterTagWhere
  ) {
    characters(where: $where) {
      name
      imageURL
      poke
      keepout
      mixup
      pressure
      defense
      whiffPunish
      tags(where: $tagsWhere2) {
        tag
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
    "tag_IN": ["Playstyle", "Tier", "Difficulty"]
  }
}
*/
