import { gql } from "@apollo/client";

export const DELETE_COMBO = gql`
  mutation DELETE_COMBO($comboId: ID!) {
    removeCombo(comboID: $comboId) {
      id
    }
  }
`;

/*
{
  "comboId": null
}
 */
