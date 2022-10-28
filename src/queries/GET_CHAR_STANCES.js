import { gql } from "@apollo/client";

export const GET_CHAR_STANCES = gql`
  query GET_CHAR_STANCES($where: CharacterWhere, $options: StanceOptions) {
    characters(where: $where) {
      stances(options: $options) {
        id
        name
        notation
        summary
        transitions
        moves {
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
            tag
            value
          }
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
