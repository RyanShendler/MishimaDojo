import { gql } from "@apollo/client";

export const DELETE_TERM = gql`
  mutation DELETE_TERM($where: TermWhere) {
    deleteTerms(where: $where) {
      nodesDeleted
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
