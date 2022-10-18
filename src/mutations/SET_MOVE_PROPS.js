import { gql } from "@apollo/client";

export const SET_MOVE_PROPS = gql`
  mutation SET_MOVE_PROPS($where: MoveWhere, $update: MoveUpdateInput) {
    updateMoves(where: $where, update: $update) {
      moves {
        startup
        onHit
        onCH
        onBlock
        damageHit
        damageCH
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "update": {
    "startup": null,
    "onHit": null,
    "onCH": null,
    "onBlock": null,
    "damageHit": null,
    "damageCH": null
  }
}
*/
