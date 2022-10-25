import { gql } from "@apollo/client";

export const EDIT_TERM = gql`
  mutation EDIT_TERM($where: TermWhere, $update: TermUpdateInput) {
    updateTerms(where: $where, update: $update) {
      terms {
        name
        description
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
    "description": null
  }
}
*/
