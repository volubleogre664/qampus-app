import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      picture
      degree
      university
      campus
      gender
      contacts {
        id
        firstName
        lastName
        email
        picture
        degree
        university
        campus
        gender
      }
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstName
      lastName
      email
      picture
      degree
      university
      campus
      gender
      contacts {
        id
        firstName
        lastName
        email
        picture
        degree
        university
        campus
        gender
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $picture: String
    $degree: String
    $university: String
    $campus: String
    $gender: String
    $newPassword: String
    $confirmNewPassword: String
    $password: String
  ) {
    updateUser(
      updateInput: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        picture: $picture
        degree: $degree
        campus: $campus
        gender: $gender
        university: $university
        newPassword: $newPassword
        confirmNewPassword: $confirmNewPassword
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
      picture
      degree
      university
      campus
      gender
      contacts {
        id
        firstName
        lastName
        email
        picture
        degree
        university
        campus
        gender
      }
    }
  }
`;

const UPLOAD_BOOK = gql`
  mutation uploadBook(
    $isbn: String!
    $title: String!
    $moduleCode: String
    $authors: String
    $price: Float!
    $frontCover: String!
    $bookOwner: ID!
  ) {
    uploadBook(
      bookInput: {
        isbn: $isbn
        title: $title
        moduleCode: $moduleCode
        authors: $authors
        price: $price
        frontCover: $frontCover
        bookOwner: $bookOwner
      }
    ) {
      id
      isbn
      title
      authors
      price
      bookOwner
      moduleCode
      frontCover
    }
  }
`;

const GET_TOKEN = gql`
  query getToken {
    getToken
  }
`;

const GET_ONE_BOOK = gql`
  query getBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      id
      isbn
      title
      authors
      price
      bookOwner
      moduleCode
      frontCover
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!, $bookOwner: ID!) {
    deleteBook(bookId: $id, bookOwner: $bookOwner)
  }
`;

const GET_ALL_BOOKS = gql`
  query getBooks($bookOwner: ID!) {
    getBooks(bookOwner: $bookOwner) {
      id
      isbn
      title
      authors
      price
      bookOwner
      moduleCode
      frontCover
    }
  }
`;

const EDIT_BOOK = gql`
  mutation editBook($bookId: ID!, $price: Float, $isBought: Boolean) {
    editBook(bookId: $bookId, price: $price, isBought: $isBought) {
      id
      isbn
      title
      authors
      price
      bookOwner
      moduleCode
      frontCover
    }
  }
`;

const SEARCH_BOOKS = gql`
  mutation searchBook($searchStr: String!) {
    searchBook(searchStr: $searchStr) {
      id
      isbn
      title
      authors
      price
      bookOwner
      moduleCode
      frontCover
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation addMessage(
    $to: ID!
    $from: ID!
    $textMsg: String
    $attachment: String
    $book: ID
  ) {
    addMessage(
      to: $to
      from: $from
      textMsg: $textMsg
      attachment: $attachment
      book: $book
    ) {
      id
      to
      from
      time
      attachment
      textMsg
      book {
        id
        isbn
        title
        authors
        price
        bookOwner
        moduleCode
        frontCover
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($to: ID!) {
    newMessage(to: $to) {
      id
      to
      from
      time
      textMsg
      attachment
      book {
        id
        isbn
        title
        authors
        price
        bookOwner
        moduleCode
        frontCover
      }
    }
  }
`;

const GET_MESSAGES_QUERY = gql`
  query getMessages($to: ID!, $from: ID!, $messagesLength: Float!) {
    getMessages(to: $to, from: $from, messagesLength: $messagesLength) {
      id
      to
      from
      time
      attachment
      textMsg
      book {
        id
        isbn
        title
        authors
        price
        bookOwner
        moduleCode
        frontCover
      }
    }
  }
`;

const GET_ALL_USER_MESSAGES = gql`
  query getAllUserMessages($userId: ID!) {
    getAllUserMessages(userId: $userId) {
      id
      to
      from
      time
      textMsg
      attachment
      book {
        id
        isbn
        title
        authors
        price
        bookOwner
        moduleCode
        frontCover
      }
    }
  }
`;

const GET_BOOK_TITLES = gql`
  query getBookTitles {
    getBookTitles {
      id
      title
    }
  }
`;

const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    getUserData(id: $id) {
      id
      firstName
      lastName
      email
      picture
      degree
      university
      campus
      gender
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  GET_TOKEN,
  UPLOAD_BOOK,
  GET_ONE_BOOK,
  GET_ALL_BOOKS,
  DELETE_BOOK,
  FORGOT_PASSWORD,
  EDIT_BOOK,
  SEARCH_BOOKS,
  ADD_MESSAGE,
  MESSAGE_SUBSCRIPTION,
  GET_MESSAGES_QUERY,
  GET_BOOK_TITLES,
  GET_USER_DATA,
  GET_ALL_USER_MESSAGES,
};
