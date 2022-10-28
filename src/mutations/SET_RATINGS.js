import { gql } from "@apollo/client";

export const SET_RATINGS = gql`
  mutation SET_RATINGS($where: CharacterWhere, $update: CharacterUpdateInput) {
    updateCharacters(where: $where, update: $update) {
      characters {
        poke
        keepout
        mixup
        pressure
        defense
        whiffPunish
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "update": {
    "poke": null,
    "keepout": null,
    "mixup": null,
    "pressure": null,
    "defense": null,
    "whiffPunish": null
  }
}
*/
