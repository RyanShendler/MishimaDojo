import { gql } from "@apollo/client";

export const GET_ALL_TIERS = gql`
  query GET_ALL_TIERS($where: CharacterTagWhere) {
    characterTags(where: $where) {
      id
      value
    }
  }
`;

/*
{
  "where": {
    "tag": "Tier"
  }
}
 */
