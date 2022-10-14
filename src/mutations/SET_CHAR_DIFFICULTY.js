import { gql } from "@apollo/client";

//detach a characters current Difficulty tag and attach a new one
export const SET_CHAR_DIFFICULTY = gql`
  mutation SET_CHAR_DIFFICULTY($charId: ID!, $tagId: ID!, $tag: String!) {
    setCharTag(charID: $charId, tagID: $tagId, tag: $tag) {
      tag
      value
    }
  }
`;

/*
{  
"charId": null,
"tagId": null,
"tag": "Difficulty"
}
 */
