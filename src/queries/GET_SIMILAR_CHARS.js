import { gql } from "@apollo/client";

export const GET_SIMILAR_CHARS = gql`
  query GET_SIMILAR_CHARS(
    $where: CharacterWhere
    $sort: [CharacterSimilarConnectionSort!]
  ) {
    characters(where: $where) {
      similarConnection(sort: $sort) {
        edges {
          node {
            id
            name
          }
          similarity
        }
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "sort": [
    {
      "edge": {
        "similarity": "DESC"
      }
    }
  ]
}
*/
