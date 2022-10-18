import { gql } from "@apollo/client";

export const GET_STANCE_HEADER = gql`
  query GET_STANCE_HEADER($where: StanceWhere) {
    stances(where: $where) {
      name
      notation
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
