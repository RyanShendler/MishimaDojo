import { gql } from "@apollo/client";

//gets all of the moves attached to a character
export const GET_MOVELIST = gql`
  query GET_MOVELIST($where: CharacterWhere) {
    characters(where: $where) {
      moves {
        id
        name
        input
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
