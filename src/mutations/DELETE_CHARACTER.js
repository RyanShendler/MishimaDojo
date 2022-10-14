import { gql } from "@apollo/client";

//deletes character with specific ID
export const DELETE_CHARACTER = gql`
  mutation DELETE_CHARACTER($where: CharacterWhere) {
    deleteCharacters(where: $where) {
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
