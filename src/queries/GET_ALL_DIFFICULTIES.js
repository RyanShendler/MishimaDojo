import { gql } from "@apollo/client";

export const GET_ALL_DIFFICULTIES = gql`
  query GET_ALL_DIFFICULTIES($where: CharacterTagWhere) {
    characterTags(where: $where) {
      id
      value
    }
  }
`;

/*
{
  "where": {
    "tag": "Difficulty"
  }
}
 */
