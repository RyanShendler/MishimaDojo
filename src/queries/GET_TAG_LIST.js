import { gql } from "@apollo/client";

export const GET_TAG_LIST = gql`
  query GET_TAG_LIST($offset: Int!, $limit: Int!) {
    getTagList(offset: $offset, limit: $limit) {
      ... on CharacterTag {
        id
        tag
        value
      }
      ... on ComboTag {
        id
        tag
        value
      }
      ... on MoveTag {
        id
        tag
        value
      }
    }
  }
`;

/*
{  "offset": null,
  "limit": null}
*/
