import { gql } from "@apollo/client";

export const GET_RECOMMENDED_CHAR = gql`
  query GET_RECOMMENDED_CHAR {
    getRecommendedChar {
      id
      name
      image
      similarity
    }
  }
`;
