import { gql } from "@apollo/client";

export const SET_MOVE_SUMMARY = gql`
  mutation SET_MOVE_SUMMARY($where: MoveWhere, $update: MoveUpdateInput) {
    updateMoves(where: $where, update: $update) {
      moves {
        summary
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "update": {
    "summary": null
  }
}
*/
