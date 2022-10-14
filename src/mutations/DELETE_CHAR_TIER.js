import { gql } from "@apollo/client";

//set a character's tier to Untiered by detaching their current Tier tag
export const DELETE_CHAR_TIER = gql`
  mutation DELETE_CHAR_TIER(
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
