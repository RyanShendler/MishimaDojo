import { gql } from "@apollo/client";

//detach a Playstyle tag from a character
export const REMOVE_CHAR_PLAYSTYLE = gql`
  mutation REMOVE_CHAR_PLAYSTYLE(
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
