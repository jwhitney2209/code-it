import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
mutation addCategory($categoryName: String!) {
  addCategory(categoryName: $categoryName) {
    _id
    categoryName
    username
  }
}`;

export const CREATE_NOTE = gql`
mutation addNote($categoryId: ID!, $noteTitle: String!, $noteText: String!, $noteSnippet: String) {
  addNote(categoryId: $categoryId, noteTitle: $noteTitle, noteText: $noteText, noteSnippet: $noteSnippet) {
    _id
    noteTitle
    noteText
    noteSnippet
    categoryId
    createdAt
    username
  }
}`;

export const REMOVE_NOTE = gql`
mutation removeNote($id: ID!, $categoryId: ID!) {
  removeNote(_id: $id, categoryId: $categoryId) {
    noteTitle
  }
}`;