import { gql } from "@apollo/client";

export const GET_COMBO_INPUTS = gql`
  query GET_COMBO_INPUTS($comboId: ID!) {
    getInputs(comboID: $comboId) {
      id
      type
      input
      moveID
    }
  }
`;

/*
{
  "comboId": null
}
*/
