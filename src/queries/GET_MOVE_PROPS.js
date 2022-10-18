import { gql } from "@apollo/client";

export const GET_MOVE_PROPS = gql`
  query GET_MOVE_PROPS($where: MoveWhere) {
    moves(where: $where) {
      startup
      onHit
      onCH
      onBlock
      damageHit
      damageCH
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
