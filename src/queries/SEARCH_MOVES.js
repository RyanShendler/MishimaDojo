import { gql } from "@apollo/client";

export const SEARCH_MOVES = gql`
  query SEARCH_MOVES($where: MoveWhere, $options: MoveOptions) {
    moves(where: $where, options: $options) {
      id
      name
      input
      users {
        id
      }
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
                "AND": [
                ]
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
