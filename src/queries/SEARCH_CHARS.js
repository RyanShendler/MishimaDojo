import { gql } from "@apollo/client";

export const SEARCH_CHARS = gql`
  query SEARCH_CHARS(
    $where: CharacterWhere
    $options: CharacterOptions
    $charactersAggregateWhere2: CharacterWhere
  ) {
    characters(where: $where, options: $options) {
      id
      name
      imageURL
    }
    charactersAggregate(where: $charactersAggregateWhere2) {
      count
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
            "AND": []
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
    ],
    "limit": 15,
    "offset": 0
  },
  "charactersAggregateWhere2": {
    "AND": [
      {
        "AND": [
          {
            "AND": []
          }
        ]
      }
    ]
  }
}
*/
