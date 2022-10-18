import { gql } from "@apollo/client";

//get all of a character's moves that aren't attached to a stance
export const GET_NONSTANCE_MOVES = gql`
  query GET_NONSTANCE_MOVES($where: CharacterWhere, $movesWhere2: MoveWhere) {
    characters(where: $where) {
      moves(where: $movesWhere2) {
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
  },
  "movesWhere2": {
    "stances_NONE": {
      "id": null
    }
  }
}
*/
