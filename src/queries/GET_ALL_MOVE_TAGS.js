import { gql } from "@apollo/client";

export const GET_ALL_MOVE_TAGS = gql`
  query GET_ALL_MOVE_TAGS {
    moveTags {
      id
      tag
      value
    }
  }
`;

/*

*/
