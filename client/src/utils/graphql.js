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

export { LOGIN_USER, REGISTER_USER, UPLOAD_BOOK, GET_ONE_BOOK };
