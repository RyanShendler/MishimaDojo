import { gql } from "@apollo/client";

export const GET_FULL_MOVELIST = gql`
  query GET_FULL_MOVELIST($where: CharacterWhere, $options: MoveOptions) {
    characters(where: $where) {
      moves(options: $options) {
        id
        name
        input
        startup
        onHit
        onCH
        onBlock
        summary
        damageHit
        damageCH
        tags {
          id
          tag
          value
        }
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "options": {
    "sort": [
      {
        "name": "ASC"
      }
    ]
  }
}
*/
