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
query notes {
  notes {
    id
    title
    snippet
    createdAt
    category {
      name
    }
    userId {
      username
    }
  }
}`;

export const QUERY_NOTE = gql`
query note($noteId: String) {
  note(noteId: $noteId) {
    id
    title
    description
    snippet
    createdAt
    category {
      name
    }
  }
}`;


export const QUERY_ME = gql`
query me {
  me {
    id
    email
    username
    categories {
      id
      name
    }
    notes {
      id
      title
      snippet
      createdAt
      category {
        name
      }
    }
  }
}
`;
