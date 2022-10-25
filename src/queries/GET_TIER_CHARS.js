import { gql } from "@apollo/client";

export const GET_TIER_CHARS = gql`
  query GET_TIER_CHARS($where: CharacterTagWhere, $options: CharacterOptions) {
    characterTags(where: $where) {
      characters(options: $options) {
        id
        name
        imageURL
      }
    }
  }
`;

/*
{
  "where": {
    "tag": "Tier",
    "value": null
  },
  "options": {
    "sort": [
      {
        "name": "ASC"
      }
    ]
  }
}
*/
