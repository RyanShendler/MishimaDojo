import { gql } from "@apollo/client";

export const GET_MOVE_SUMMARY = gql`
  query GET_MOVE_SUMMARY($where: MoveWhere) {
    moves(where: $where) {
      summary
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
