import { gql } from "@apollo/client";

export const GET_TERM_LIST = gql`
  query GET_TERM_LIST($options: TermOptions) {
    terms(options: $options) {
      id
      name
      description
    }
  }
`;

/*
{
  "options": {
    "sort": [
      {
        "name": "ASC"
      }
    ]
  }
}
*/
