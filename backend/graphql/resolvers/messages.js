import dayjs from "dayjs";
import pkg from "apollo-server";
const { AuthenticationError, UserInputError, withFilter } = pkg;

import checkAuth from "../../utils/checkAuth.js";
import Message from "../../models/Message.js";
import User from "../../models/User.js";
import Book from "../../models/Book.js";

const messageResolvers = {
  Query: {
    async getMessages(_, { to, from, messagesLength }, context) {
      const user = checkAuth(context);

      try {
        if (from !== user.studentNumber) {
          throw new AuthenticationError("Cannot get other users messages", {
            errors: {
              user: "Cannot query data you don't own",
            },
          });
        }

        const sentMessages = await Message.find().or([
          {
            to: to,
            from: from,
          },
          {
            to: from,
            from: to,
          },
        ]);

        return sentMessages.length === messagesLength
          ? []
          : sentMessages.slice(messagesLength);
      } catch (err) {
        throw new Error("Errors getting your messages", {
          errors: err,
        });
      }
    },
  },
  Mutation: {
    async addMessage(_, { to, textMsg, book }, context) {
      const user = checkAuth(context);

      try {
        let toUser = await User.findOne({ studentNumber: to });

        if (!toUser) {
          throw new UserInputError(
            "Cannot find the person you are sending message to.",
            {
              errors: {
                message: "Cannot send message to non existing contact",
              },
            }
          );
        }

        const msgObject = {
          to,
          from: user.studentNumber,
          time: dayjs().toISOString(),
          textMsg,
        };

        if (book) {
          msgObject.book = book;
        }

        const message = new Message(msgObject);

        let fromUser = await User.findOne({
          studentNumber: user.studentNumber,
        });

        if (!fromUser.contacts) fromUser.contacts = [];
        if (!toUser.contacts) toUser.contacts = [];

        if (
          !fromUser.contacts.filter(
            (item) => item.studentNumber === toUser.studentNumber
          ).length
        ) {
          fromUser.contacts.push({
            id: toUser.id,
            firstName: toUser.firstName,
            lastName: toUser.lastName,
            studentNumber: toUser.studentNumber,
            picture: toUser.picture,
          });

          fromUser = await fromUser.save();

          // context.pubsub.publish("USER_UPDATED", {
          //   userUpdated: fromUSer,
          // });
        }

        if (
          !toUser.contacts.filter(
            (item) => item.studentNumber === fromUser.studentNumber
          ).length
        ) {
          toUser.contacts.push({
            id: fromUser.id,
            firstName: fromUser.firstName,
            lastName: fromUser.lastName,
            studentNumber: fromUser.studentNumber,
            picture: fromUser.picture,
          });

          toUser = await toUser.save();

          // context.pubsub.publish("USER_UPDATED", {
          //   userUpdated: toUSer,
          // });
        }

        const res = await message.save();

        let bookObj;
        if (book) {
          bookObj = await Book.findById(book);
        }

        context.pubsub.publish("NEW_MESSAGE", {
          newMessage: res,
        });

        return {
          id: res._id,
          to: res.to,
          from: res.from,
          textMsg: res.textMsg,
          time: res.time,
          book: bookObj,
        };
      } catch (err) {
        throw new Error("Error sending message", {
          errors: err,
        });
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MESSAGE"),
        ({ newMessage: message }, variables) => message.to === variables.to
      ),
    },
  },
};

export default messageResolvers;
