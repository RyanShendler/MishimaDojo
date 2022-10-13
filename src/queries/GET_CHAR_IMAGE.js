import { gql } from "@apollo/client";

export const GET_CHAR_IMAGE = gql`
  query GET_CHAR_IMAGE($where: CharacterWhere) {
    characters(where: $where) {
      imageURL
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
