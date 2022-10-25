import { gql } from "@apollo/client";

export const GET_ALL_PLAYSTYLES = gql`
  query GET_ALL_PLAYSTYLES($where: CharacterTagWhere) {
    characterTags(where: $where) {
      id
      value
    }
  }
`;

/*
{
  "where": {
    "tag": "Playstyle"
  }
}
*/
