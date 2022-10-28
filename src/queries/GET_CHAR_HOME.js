import { gql } from "@apollo/client";

export const GET_CHAR_HOME = gql`
  query GET_CHAR_HOME($where: CharacterWhere) {
    characters(where: $where) {
      summary
      strengths
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
