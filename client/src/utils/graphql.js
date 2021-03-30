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

export { LOGIN_USER, REGISTER_USER };
