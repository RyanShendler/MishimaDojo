import { gql } from "@apollo/client";

export const GET_NEW_LAUNCHERS = gql`
  query GET_NEW_LAUNCHERS($where: CharacterWhere, $movesWhere2: MoveWhere) {
    characters(where: $where) {
      moves(where: $movesWhere2) {
        id
        input
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "movesWhere2": {
    "launcherFor_NONE": {
      "id": null
    }
  }
}
*/
