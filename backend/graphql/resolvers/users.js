import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "apollo-server"
// import { UserInputError } from "apollo-server";
const {UserInputError} = pkg;

import {
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validators.js";
import User from "../../models/User.js";
import { SECRET_KEY } from "../../config.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      studentNumber: user.studentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
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
  },
};

export default userResolvers;
