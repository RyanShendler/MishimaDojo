import { gql } from "@apollo/client";

export const DELETE_STANCE = gql`
  mutation DELETE_STANCE($where: StanceWhere) {
    deleteStances(where: $where) {
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
