import { gql } from "@apollo/client";

export const CREATE_COMBO = gql`
  mutation CREATE_COMBO($input: [ComboCreateInput!]!) {
    createCombos(input: $input) {
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
      "input": "",
      "damage": 0,
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
