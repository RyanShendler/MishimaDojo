import { gql } from "@apollo/client";

//get a specific character tag for a specific character
export const GET_CHAR_TIER = gql`
  query GET_CHAR_TIER($where: CharacterWhere, $tagsWhere2: CharacterTagWhere) {
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
    "tag": "Tier"
  }
}
*/
