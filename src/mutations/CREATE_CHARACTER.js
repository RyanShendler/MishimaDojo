import { gql } from "@apollo/client";

//creates a new character
export const CREATE_CHARACTER = gql`
  mutation CREATE_CHARACTER($input: [CharacterCreateInput!]!) {
    createCharacters(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;

/* 
{
  "input": [
    {
      "name": "",
      "imageURL": "",
      "summary": "",
      "poke": 1,
      "keepout": 1,
      "mixup": 1,
      "pressure": 1,
      "defense": 1,
      "whiffPunish": 1,
      "strengths": [],
      "weaknesses": []
    }
  ]
}
*/
