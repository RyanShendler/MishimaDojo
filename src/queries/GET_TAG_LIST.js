import { gql } from "@apollo/client";

export const GET_TAG_LIST = gql`
  query GET_TAG_LIST {
    characterTags {
      id
      tag
      value
    }
    comboTags {
      id
      tag
      value
    }
    moveTags {
      id
      tag
      value
    }
  }
`;
