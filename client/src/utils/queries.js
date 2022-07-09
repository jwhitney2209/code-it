import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    categories {
      _id
      name
      notes {
        _id
        noteTitle
        noteText
        noteSnippet
        createdAt
      }
    }
  }
}
`