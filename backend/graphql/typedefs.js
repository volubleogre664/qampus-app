import gql from "graphql-tag";

export default gql`
  type User {
    id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    email: String
    picture: String!
    degree: String
    bio: String
    token: String
  }

  type Book {
    id: ID!
    isbn: String!
    title: String!
    subtitle: String
    authors: String!
    price: Float!
    description: String
    moduleCode: String
    studentNumber: String!
    frontCover: String
    backCover: String
  }

  type Message {
    id: ID!
    time: String!
    from: String!
    to: String!
    textMsg: String!
  }

  input RegisterInput {
    studentNumber: String!
    firstName: String!
    lastName: String!
    email: String
    picture: String
    degree: String
    bio: String
    password: String!
    confirmPassword: String!
  }

  input BookInput {
    isbn: String!
    title: String!
    subtitle: String
    moduleCode: String
    authors: String
    price: Float!
    description: String
    studentNumber: String!
    frontCover: String
    backCover: String
  }

  type Query {
    getMessages(to: String!, from: String!): [Message]
    getBooks(selector: String!): [Book]
    getBook(bookId: ID!): Book!
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(studentNumber: String!, password: String!): User!
    uploadBook(bookInput: BookInput!): Book!
    deleteBook(bookId: ID!): String!
  }
`;
