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

const UPDATE_USER = gql`
  mutation updateUser(
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
    updateUser(
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
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(bookId: $id)
  }
`;

const GET_ALL_BOOKS = gql`
  query getBooks($studentNumber: String!) {
    getBooks(studentNumber: $studentNumber) {
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
    }
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
    }
  }
`;

const SEARCH_BOOKS = gql`
  mutation searchBook($searchStr: String!) {
    searchBook(searchStr: $searchStr) {
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
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  SEARCH_BOOKS,
  ADD_MESSAGE,
  MESSAGE_SUBSCRIPTION,
  GET_MESSAGES_QUERY,
  GET_BOOK_TITLES,
  GET_USER_DATA,
};
