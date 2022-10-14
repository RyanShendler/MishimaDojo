import { gql } from "@apollo/client";

//get all combos attached to a character
export const GET_COMBOLIST = gql`
  query GET_COMBOLIST($where: CharacterWhere) {
    characters(where: $where) {
      combos {
        id
        name
        input
      }
    }
  }
`;

/*
 */
