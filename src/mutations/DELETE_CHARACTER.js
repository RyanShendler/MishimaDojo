import { gql } from "@apollo/client";

//deletes character with specific ID and any of its attached moves, combos, and stances
export const DELETE_CHARACTER = gql`
  mutation DELETE_CHARACTER($charId: ID!) {
    deleteChar(charID: $charId) {
      id
    }
  }
`;

/*
{
  "charId": null
}
 */
