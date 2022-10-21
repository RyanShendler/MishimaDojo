import { gql } from "@apollo/client";

export const GET_PUNISHERS = gql`
  query GET_PUNISHERS($where: CharacterWhere, $movesWhere2: MoveWhere) {
    characters(where: $where) {
      moves(where: $movesWhere2) {
        id
        input
        startup
        damageHit
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
    "tags_SOME": {
      "tag": "Punisher",
      "value": null
    }
  }
}
*/
