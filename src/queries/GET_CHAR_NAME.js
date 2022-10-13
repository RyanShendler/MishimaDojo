import { gql } from "@apollo/client";

export const GET_CHAR_NAME = gql`
  query GET_CHAR_NAME($where: CharacterWhere) {
    characters(where: $where) {
      name
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
