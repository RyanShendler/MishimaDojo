import { gql } from "@apollo/client";

export const SET_STANCE_SUMMARY = gql`
  mutation SET_STANCE_SUMMARY($where: StanceWhere, $update: StanceUpdateInput) {
    updateStances(where: $where, update: $update) {
      stances {
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
