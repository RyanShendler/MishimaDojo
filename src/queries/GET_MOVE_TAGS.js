import { gql } from "@apollo/client";

export const GET_MOVE_TAGS = gql`
  query GET_MOVE_TAGS($where: MoveWhere) {
    moves(where: $where) {
      tags {
        id
        tag
        value
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  }
}
*/
