import { gql } from "@apollo/client";

export const GET_CHAR_WEAKNESSES = gql`
  query GET_CHAR_WEAKNESSES($where: CharacterWhere) {
    characters(where: $where) {
      weaknesses
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
