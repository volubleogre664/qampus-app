import userResolvers from "./users.js";

export default {
  Mutation: { ...userResolvers.Mutation },
};
