import { gql } from "@apollo/client";

export const DELETE_CHAR_TAG = gql`
  mutation DELETE_CHAR_TAG($where: CharacterTagWhere) {
    deleteCharacterTags(where: $where) {
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
