import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "apollo-server";
// import { UserInputError } from "apollo-server";
const { UserInputError } = pkg;

import {
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validators.js";
import User from "../../models/User.js";
import { SECRET_KEY } from "../../config.js";
import checkAuth from "../../utils/checkAuth.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      studentNumber: user.studentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.picture,
      degree: user.degree,
      bio: user.bio,
      contacts: user?.contacts,
    },
    SECRET_KEY,
    { expiresIn: "12h" }
  );
}

const userResolvers = {
  Mutation: {
    async login(_, { studentNumber, password }) {
      const { errors, valid } = validateLoginInput(studentNumber, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ studentNumber });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    //Registering a user
    async register(
      _,
      {
        registerInput: {
          studentNumber,
          firstName,
          lastName,
          email,
          picture,
          degree,
          bio,
          password,
          confirmPassword,
        },
      }
    ) {
      // 1. Validate user input
      const { valid, errors } = validateRegisterInput(
        studentNumber,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure user doesn't already exist
      const user = await User.findOne({ studentNumber });
      if (user) {
        throw new UserInputError("Student number is taken", {
          errors: {
            studentNumber:
              "This student number is registered, try to loggin with",
          },
        });
      }

      // hash password and create user password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        studentNumber,
        firstName,
        lastName,
        email,
        picture: picture && picture.replace(/ /gi, "") ? picture : "",
        degree: degree && degree.replace(/ /gi, "") ? degree : "",
        bio: bio && bio.replace(/ /gi, "") ? bio : "",
        password,
      });

      const res = await newUser.save();
      // console.log(res);

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(_, { updateInput }, context) {
      // Test this in GraphQL PlayGrounds
      const user = checkAuth(context);

      const updatedUser = await User.findById(user.id);

      const match = await bcrypt.compare(
        updateInput.password,
        updatedUser.password
      );

      if (!match) {
        throw new UserInputError("Wrong credentials", {
          errors: {
            password: "Wrong password.",
          },
        });
      }

      const { password, confirmNewPassword, newPassword, ...newUserData } =
        updateInput;

      if (updateInput?.newPassword) {
        const newPassword = await bcrypt.hash(updateInput.newPassword, 12);
        newUserData.password = newPassword;
      }

      Object.keys(newUserData).forEach((key) => {
        updatedUser[key] = newUserData[key];
      });

      const res = await updatedUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },

  Subscription: {
    userUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("USER_UPDATED"),
    },
  },
};

export default userResolvers;
