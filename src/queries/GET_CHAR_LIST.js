import { gql } from "@apollo/client";

//get a list of all characters in the database
//return charID, name, and lastModified
export const GET_CHAR_LIST = gql`
  query GET_CHAR_LIST($options: CharacterOptions) {
    characters(options: $options) {
      id
      name
      imageURL
    }
    charactersAggregate {
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
    "limit": 8,
    "offset": 0
  }
}
*/
