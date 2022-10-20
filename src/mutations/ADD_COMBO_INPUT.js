import { gql } from "@apollo/client";

export const ADD_COMBO_INPUT = gql`
  mutation ADD_COMBO_INPUT(
    $comboId: ID!
    $type: String!
    $input: String!
    $moveId: ID
  ) {
    addInput(comboID: $comboId, type: $type, input: $input, moveID: $moveId) {
      id
    }
  }
`;

/*
{  
  "comboId": null,
  "type": null,
  "input": null,
  "moveId": null
}
*/
