import { gql } from "@apollo/client";

export const SET_STANCE_TRANSITIONS = gql`
  mutation SET_STANCE_TRANSITIONS(
    $where: StanceWhere
    $update: StanceUpdateInput
  ) {
    updateStances(where: $where, update: $update) {
      stances {
        transitions
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
    "transitions": null
  }
}
*/
