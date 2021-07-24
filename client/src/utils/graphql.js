import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation loginUser($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      id
      studentNumber
      firstName
      lastName
      email
      picture
      degree
      bio
      contacts {
        id
        firstName
        lastName
        studentNumber
        picture
      }
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $studentNumber: String!
    $firstName: String!
    $lastName: String!
    $email: String
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        studentNumber: $studentNumber
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      studentNumber
      firstName
      lastName
      email
      picture
      degree
      bio
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateBook(
    $firstName: String
    $lastName: String
    $email: String
    $picture: String
    $degree: String
    $bio: String
    $newPassword: String
    $confirmNewPassword: String
    $password: String
  ) {
    updateBook(
      updateInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        picture: $picture
        degree: $degree
        bio: $bio
        newPassword: $newPassword
        confirmNewPassword: $confirmNewPassword
        password: $password
      }
    ) {
      id
      studentNumber
      firstName
      lastName
      email
      picture
      degree
      bio
      token
    }
  }
`;

const UPLOAD_BOOK = gql`
  mutation uploadBook(
    $isbn: String!
    $title: String!
    $subtitle: String
    $moduleCode: String
    $authors: String
    $price: Float!
    $description: String
    $studentNumber: String!
    $frontCover: String
    $backCover: String
  ) {
    uploadBook(
      bookInput: {
        isbn: $isbn
        title: $title
        subtitle: $subtitle
        moduleCode: $moduleCode
        authors: $authors
        price: $price
        description: $description
        studentNumber: $studentNumber
        frontCover: $frontCover
        backCover: $backCover
      }
    ) {
      id
      isbn
      title
      subtitle
      authors
      price
      description
      moduleCode
      studentNumber
      frontCover
      backCover
    }
  }
`;

const GET_ONE_BOOK = gql`
  query getBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      id
      isbn
      title
      subtitle
      authors
      price
      description
      moduleCode
      studentNumber
      frontCover
      backCover
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const EDIT_BOOK = gql`
  mutation editBook($id: ID!, $price: Float, $isBought: Boolean) {
    editBook(id: $id, price: $price, isBought: $isBought) {
      id
      isbn
      title
      subtitle
      authors
      price
      description
      moduleCode
      studentNumber
      frontCover
      backCover
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation addMessage($to: ID!, $textMsg: String!, $book: ID) {
    addMessage(to: $to, textMsg: $textMsg, book: $book) {
      id
      to
      from
      time
      textMsg
      book {
        id
        isbn
        title
        subtitle
        authors
        price
        description
        moduleCode
        studentNumber
        frontCover
        backCover
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
      book {
        id
        isbn
        title
        subtitle
        authors
        price
        description
        moduleCode
        studentNumber
        frontCover
        backCover
      }
    }
  }
`;

const GET_MESSAGES_QUERY = gql`
  query getMessages($to: String!, $from: String!, $messagesLength: Float!) {
    getMessages(to: $to, from: $from, messagesLength: $messagesLength) {
      id
      to
      from
      time
      textMsg
      book {
        id
        isbn
        title
        subtitle
        authors
        price
        description
        moduleCode
        studentNumber
        frontCover
        backCover
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
  query getUserData($studentNumber: String!) {
    getUserData(studentNumber: $studentNumber) {
      id
      studentNumber
      firstName
      lastName
      picture
    }
  }
`;

export {
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
  UPLOAD_BOOK,
  GET_ONE_BOOK,
  DELETE_BOOK,
  EDIT_BOOK,
  ADD_MESSAGE,
  MESSAGE_SUBSCRIPTION,
  GET_MESSAGES_QUERY,
  GET_BOOK_TITLES,
  GET_USER_DATA,
};
