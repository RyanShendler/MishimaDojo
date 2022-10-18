import { gql } from "@apollo/client";

//get all move tags not currently attached to a move
export const GET_NEW_MOVE_TAGS = gql`
  query GET_NEW_MOVE_TAGS($where: MoveTagWhere) {
    moveTags(where: $where) {
      id
      tag
      value
    }
  }
`;

/*
{
  "where": {
    "moves_NONE": {
      "id": null
    }
  }
}
*/
