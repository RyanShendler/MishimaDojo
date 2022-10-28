import { gql } from "@apollo/client";

export const GET_RATINGS = gql`
  query GET_RATINGS($where: CharacterWhere) {
    characters(where: $where) {
      poke
      keepout
      mixup
      pressure
      defense
      whiffPunish
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
