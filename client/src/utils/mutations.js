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
mutation addUser($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  addUser(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
    token
    user {
      id
      email
    }
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
mutation addNote($tag: String!, $noteTitle: String!, $noteText: String!, $noteSnippet: String) {
  addNote(tag: $tag, noteTitle: $noteTitle, noteText: $noteText, noteSnippet: $noteSnippet) {
    _id
    noteTitle
    noteText
    noteSnippet
    tag
    createdAt
    userId
  }
}`;

export const REMOVE_NOTE = gql`
mutation removeNote($id: ID!) {
  removeNote(_id: $id) {
    noteTitle
  }
}`;