import { gql } from "@apollo/client";

export const CREATE_COMBO = gql`
  mutation CREATE_COMBO(
    $charId: ID!
    $name: String!
    $type: String!
    $input: String!
    $tagType: String!
    $tagName: String!
  ) {
    makeCombo(
      charID: $charId
      name: $name
      type: $type
      input: $input
      tagType: $tagType
      tagName: $tagName
    ) {
      id
    }
  }
`;

/*
{  
  "charId": null,
  "name": null,  
  "type": "Launcher",
  "input": "Launcher",
  "tagType": null,
  "tagName": "Type"
}
 */
