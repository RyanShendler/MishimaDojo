import { gql } from "@apollo/client";

export const GET_CHAR_COMBO = gql`
  query GET_CHAR_COMBO($where: CharacterWhere, $combosWhere2: ComboWhere) {
    characters(where: $where) {
      combos(where: $combosWhere2) {
        id
        name
      }
    }
  }
`;

/*
{
  "where": {
    "id": null
  },
  "combosWhere2": {
    "tags_SOME": {
      "tag": "Type",
      "value": null
    }
  }
}
*/
