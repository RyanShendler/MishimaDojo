import { gql } from "@apollo/client";

//get the Tier tag attached to a character
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
