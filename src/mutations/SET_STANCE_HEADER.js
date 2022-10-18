import { gql } from "@apollo/client";

export const SET_STANCE_HEADER = gql`
  mutation SET_STANCE_HEADER($where: StanceWhere, $update: StanceUpdateInput) {
    updateStances(where: $where, update: $update) {
      stances {
        name
        notation
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
    "name": null,
    "notation": null
  }
}
*/
