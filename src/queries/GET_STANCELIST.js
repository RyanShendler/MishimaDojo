import { gql } from "@apollo/client";

//get all stances attached to a character
export const GET_STANCELIST = gql`
  query GET_STANCELIST($where: CharacterWhere) {
    characters(where: $where) {
      stances {
        id
        name
        notation
      }
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
