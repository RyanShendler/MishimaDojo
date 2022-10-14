import { gql } from "@apollo/client";

//detach a characters current Tier tag and attach a new one
export const SET_CHAR_TIER = gql`
  mutation SET_CHAR_TIER($charId: ID!, $tagId: ID!, $tag: String!) {
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
"tag": "Tier"
}
 */
