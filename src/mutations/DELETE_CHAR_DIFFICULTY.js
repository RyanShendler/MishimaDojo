import { gql } from "@apollo/client";

//set a character's difficulty to Unrated by detaching their current Difficulty tag
export const DELETE_CHAR_DIFFICULTY = gql`
  mutation DELETE_CHAR_DIFFICULTY(
    $where: CharacterWhere
    $disconnect: CharacterDisconnectInput
  ) {
    updateCharacters(where: $where, disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "disconnect": {
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
