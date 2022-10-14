import { gql } from "@apollo/client";

//create a move and attach it to its user
export const CREATE_MOVE = gql`
  mutation CREATE_MOVE($input: [MoveCreateInput!]!) {
    createMoves(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`;

/*
{
  "input": [
    {
      "name": null,
      "input": null,
      "startup": 10,
      "onHit": 0,
      "onCH": 0,
      "onBlock": 0,
      "summary": "",
      "damageHit": 0,
      "damageCH": 0,
      "users": {
        "connect": [
          {
            "where": {
              "node": {
                "id": null
              }
            }
          }
        ]
      }
    }
  ]
}
*/
