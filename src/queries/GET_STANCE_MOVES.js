import { gql } from "@apollo/client";

export const GET_STANCE_MOVES = gql`
  query GET_STANCE_MOVES($where: StanceWhere) {
    stances(where: $where) {
      moves {
        id
        name
        input
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
