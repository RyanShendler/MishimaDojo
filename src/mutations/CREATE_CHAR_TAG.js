import { gql } from "@apollo/client";

export const CREATE_CHAR_TAG = gql`
  mutation CREATE_CHAR_TAG($input: [CharacterTagCreateInput!]!) {
    createCharacterTags(input: $input) {
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
