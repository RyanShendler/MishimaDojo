import { gql } from "@apollo/client";

export const GET_CHAR_SUMMARY = gql`
  query GET_CHAR_SUMMARY($where: CharacterWhere) {
    characters(where: $where) {
      summary
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
