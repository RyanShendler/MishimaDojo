import { gql } from "@apollo/client";

export const SEARCH_MOVES = gql`
  query SEARCH_MOVES(
    $where: MoveWhere
    $options: MoveOptions
    $movesAggregateWhere2: MoveWhere
  ) {
    moves(where: $where, options: $options) {
      id
      name
      input
      users {
        id
      }
    }
    movesAggregate(where: $movesAggregateWhere2) {
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
            "AND": [
              {
                "AND": []
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
    ],
    "limit": 12,
    "offset": 0
  },
  "movesAggregateWhere2": {
    "AND": [
      {
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
    ]
  }
}
*/
