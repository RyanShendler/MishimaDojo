import { gql } from "@apollo/client";

export const GET_COMBO_LAUNCHERS = gql`
  query GET_COMBO_LAUNCHERS($where: ComboWhere) {
    combos(where: $where) {
      launchers {
        id
        name
        input
        launcherForConnection {
          edges {
            type
          }
        }
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  }
}
*/
