import { gql } from "@apollo/client";

export const CREATE_MOVE_TAG = gql`
  mutation CREATE_MOVE_TAG($input: [MoveTagCreateInput!]!) {
    createMoveTags(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;

/*
{
  "input": [{
    "tag": "",
    "value": "",
  }]
}
 */
