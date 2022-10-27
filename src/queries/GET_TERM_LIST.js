import { gql } from "@apollo/client";

export const GET_TERM_LIST = gql`
  query GET_TERM_LIST($options: TermOptions) {
    terms(options: $options) {
      id
      name
      description
    }
    termsAggregate {
      count
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
    ],
    "limit": 6,
    "offset": null
  }
}
*/
