import { gql } from "@apollo/client";

export const CREATE_TERM = gql`
  mutation CREATE_TERM($input: [TermCreateInput!]!) {
    createTerms(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;

/*
{
  "input": [
    {
      "name": null,
      "description": null
    }
  ]
}
*/
