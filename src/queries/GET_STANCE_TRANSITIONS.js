import { gql } from "@apollo/client";

export const GET_STANCE_TRANSITIONS = gql`
  query GET_STANCE_TRANSITIONS($where: StanceWhere) {
    stances(where: $where) {
      transitions
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
