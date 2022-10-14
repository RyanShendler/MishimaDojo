import { gql } from "@apollo/client";

export const CREATE_STANCE = gql`
  mutation CREATE_STANCE($input: [StanceCreateInput!]!) {
    createStances(input: $input) {
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
      "notation": null,
      "summary": "",
      "transitions": [],
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
