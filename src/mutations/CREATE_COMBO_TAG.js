import { gql } from "@apollo/client";

export const CREATE_COMBO_TAG = gql`
  mutation CREATE_COMBO_TAG($input: [ComboTagCreateInput!]!) {
    createComboTags(input: $input) {
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
