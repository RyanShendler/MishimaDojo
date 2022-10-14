import { gql } from "@apollo/client";

//get a list of all Playstyle tags that are not attached to a character
export const GET_NEW_PLAYSTYLES = gql`
  query GET_NEW_PLAYSTYLES($where: CharacterTagWhere) {
    characterTags(where: $where) {
      id
      value
    }
  }
`;

/*
{
  "where": {
    "tag": "Playstyle",
    "characters_NONE": {
      "id": null
    }
  }
}
 */
