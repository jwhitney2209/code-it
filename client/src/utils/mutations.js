import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      id
    }
    token
  }
}
`;

export const CREATE_CATEGORY = gql`
mutation addCategory($name: String!) {
  addCategory(name: $name) {
    name
    id
    userId
  }
}`;

export const CREATE_NOTE = gql`
mutation addNote($title: String!, $snippet: String, $description: String, $categoryId: String) {
  addNote(title: $title, snippet: $snippet, description: $description, categoryId: $categoryId) {
    id
    title
    snippet
    description
    createdAt
    category {
      name
    }
  }
}`;

export const REMOVE_NOTE = gql`
mutation removeNote($noteId: String!) {
  removeNote(noteId: $noteId)
}`;