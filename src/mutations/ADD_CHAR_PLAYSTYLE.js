import { gql } from "@apollo/client";

//attach a Playstyle tag to a character
export const ADD_CHAR_PLAYSTYLE = gql`
  mutation ADD_CHAR_PLAYSTYLE(
    $where: CharacterWhere
    $connect: CharacterConnectInput
  ) {
    updateCharacters(where: $where, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "connect": {
    "tags": [
      {
        "where": {
          "node": {
            "id": null
          }
        }
      }
    ]
  }
}
 */
