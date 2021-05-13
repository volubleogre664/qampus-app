import userResolvers from "./users.js";
import bookResolvers from "./books.js";

export default {
  Mutation: { ...userResolvers.Mutation, ...bookResolvers.Mutation },
  Query: { ...bookResolvers.Query },
};
