import { gql } from "@apollo/client";

export const GET_MOVE_HEADER = gql`
  query GET_MOVE_HEADER($where: MoveWhere) {
    moves(where: $where) {
      name
      input
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
