import { gql } from "@apollo/client";

//creates a new character
export const CREATE_CHARACTER = gql`
  mutation CREATE_CHARACTER($input: [CharacterCreateInput!]!) {
    createCharacters(input: $input) {
      characters {
        charID
      }
    }
  }
`;

/* 
{
  "input": [{
    "name": "",
    "imageURL": "",
    "summary": "",
    "strengths": [],
    "weaknesses": []
  }]
}
*/