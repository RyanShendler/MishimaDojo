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
