import { gql } from "@apollo/client";

export const GET_CHAR_STRENGTHS = gql`
  query GET_CHAR_STRENGTHS($where: CharacterWhere) {
    characters(where: $where) {
      strengths
    }
  }
`;

/* 
{
  "where": {
    "id": null
  }
}
*/
