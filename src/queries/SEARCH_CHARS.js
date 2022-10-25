import { gql } from "@apollo/client";

export const SEARCH_CHARS = gql`
  query SEARCH_CHARS($where: CharacterWhere, $options: CharacterOptions) {
    characters(where: $where, options: $options) {
      id
      name
      imageURL
    }
  }
`;

/*
{
  "where": {
    "AND": [
      {
        "AND": [
          {
            "AND": [
              {
                "tags_SOME": {
                  "id": null
                }
              }
            ]
          }
        ]
      }
    ]
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
