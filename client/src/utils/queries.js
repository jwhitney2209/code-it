import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
query categories($userId: ID!) {
  categories(userId: $userId) {
    _id
    name
    userId
    notes {
      _id
      noteTitle
      noteText
      noteSnippet
      categoryId
      createdAt
    }
  }
}`;

export const QUERY_CATEGORY = gql`
query category($id: ID!) {
  category(_id: $id) {
    _id
    name
    userId
    notes {
      _id
      noteTitle
      noteText
      noteSnippet
      categoryId
      createdAt
    }
  }
}
`;

export const QUERY_NOTES = gql`
query notes($userId: ID!) {
  notes(userId: $userId) {
    _id
    noteTitle
    noteText
    noteSnippet
    categoryId
    createdAt
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
{
  me {
    _id
    username
    email
    categories {
      _id
      name
      userId
      notes {
        _id
        noteTitle
        noteText
        noteSnippet
        categoryId
        createdAt
        userId
      }
    }
  }
}
`;
