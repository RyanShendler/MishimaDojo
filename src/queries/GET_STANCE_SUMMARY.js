import { gql } from "@apollo/client";

export const GET_STANCE_SUMMARY = gql`
  query GET_STANCE_SUMMARY($where: StanceWhere) {
    stances(where: $where) {
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
