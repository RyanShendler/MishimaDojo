import { gql } from "@apollo/client";

//get all moves not connected to any stances
export const GET_STANCELESS = gql`
  query GET_STANCELESS($where: CharacterWhere, $movesWhere2: MoveWhere) {
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
    "stancesAggregate": {
      "count": 0
    }
  }
}
*/
