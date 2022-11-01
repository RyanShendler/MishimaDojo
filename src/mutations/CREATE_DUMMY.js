import { gql } from "@apollo/client";

export const CREATE_DUMMY = gql`
  mutation CREATE_DUMMY($input: [CharacterCreateInput!]!) {
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
      "name": "Test",
      "imageURL": "",
      "summary": "",
      "poke": null,
      "keepout": null,
      "mixup": null,
      "pressure": null,
      "defense": null,
      "whiffPunish": null,
      "strengths": [],
      "weaknesses": []
    }
  ]
}
*/
