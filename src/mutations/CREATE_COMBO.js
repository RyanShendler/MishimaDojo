import { gql } from "@apollo/client";

export const CREATE_COMBO = gql`
  mutation CREATE_COMBO(
    $charId: ID!
    $name: String!
    $type: String!
    $input: String!
  ) {
    makeCombo(charID: $charId, name: $name, type: $type, input: $input) {
      id
    }
  }
`;

/*
{  
  "charId": null,
  "name": null,  
  "type": "Launcher",
  "input": "Launcher"
}
 */
