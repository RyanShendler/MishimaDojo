import { gql } from "@apollo/client";

export const REMOVE_COMBO_INPUT = gql`
  mutation REMOVE_COMBO_INPUT($inputId: ID!) {
    removeInput(inputID: $inputId) {
      id
    }
  }
`;

/*
{
  "inputId": null
}
*/
