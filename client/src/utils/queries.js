import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
query categories($username: String) {
  categories(username: $username) {
    _id
    categoryName
    username
  }
}`;

export const QUERY_CATEGORY = gql`
query category($id: ID!) {
  category(_id: $id) {
    _id
    categoryName
    username
    notes {
      _id
      noteTitle
      noteText
      noteSnippet
      categoryId
      createdAt
      username
    }
  }
}
`;

export const QUERY_NOTES = gql`
query notes($username: String) {
  notes(username: $username) {
    _id
    noteTitle
    noteText
    noteSnippet
    categoryId
    createdAt
    username
  }
}`;

export const QUERY_NOTE = gql`
query note($id: ID!) {
  note(_id: $id) {
    _id
    noteTitle
    noteText
    noteSnippet
    categoryId
    createdAt
  }
}`;


export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    categories {
      _id
      categoryName
      username
      notes {
        _id
        noteTitle
        noteText
        noteSnippet
        categoryId
        createdAt
        username
      }
    }
  }
}
`;
