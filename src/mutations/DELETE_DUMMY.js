import { gql } from "@apollo/client";

export const DELETE_DUMMY = gql`
  mutation DELETE_DUMMY($where: CharacterWhere) {
    deleteCharacters(where: $where) {
      nodesDeleted
    }
  }
`;

/*
{
  "where": {
    "name": "Test"
  }
}
*/
