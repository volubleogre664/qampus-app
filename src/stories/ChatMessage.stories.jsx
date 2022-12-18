import React from "react";

import ChatMessage from "../components/Message";

export default {
  title: "Components/ChatMessage",
  component: ChatMessage,
  parameters: {
    docs: {
      description: {
        component: "Chat message component",
      },
    },
  },
  argTypes: {
    msg: {
      description: "Chat conversation message",
      table: {
        type: {
          summary: "object",
          detail:
            "This is the message object that contains the message text, sender, receiver and timestamp. The sender and receiver are the user ids of the sender and receiver of the message. The timestamp is the time when the message was sent. The message may also contains a book object which is the book that is being discussed in the chat.",
        },
      },
      control: {
        type: "object",
      },
    },

    from: {
      description: "Message sender",
      table: {
        type: {
          summary: "String",
          detail: "This is the sender of the message",
        },
      },
    },
  },
};

const Template = (args) => <ChatMessage {...args} />;

export const SentMessage = Template.bind({});
SentMessage.args = {
  msg: {
    to: "John Doe",
    from: "Jane Doe",
    textMsg:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum facilis dolorum saepe consequatur, suscipit adipisci quo error illo quod nisi? Numquam eaque sequi labore dolorum porro repellendus? Soluta, veritatis recusandae.",
    time: new Date().toLocaleString(),
  },
  from: "Jane Doe",
};

const imageCover =
  "https://www.pluggedin.com/wp-content/uploads/2020/01/hobbit-cover-670x1024.jpg";

export const ReceivedMessage = Template.bind({});
ReceivedMessage.args = {
  msg: {
    to: "John Doe",
    from: "Jane Doe",
    textMsg:
      "Hey, Do you think we can meet tomorrow midday or somewhere around those times?",
    time: new Date().toLocaleString(),
  },
  from: "John Doe",
};

export const SentMessageWithBook = Template.bind({});
SentMessageWithBook.args = {
  msg: {
    to: "John Doe",
    from: "Jane Doe",
    textMsg: "Hey, I'm interested in your book!",
    time: new Date().toLocaleString(),
    book: {
      title: "The Hobbit",
      price: "400",
      bookOwner: "John Doe",
      frontCover: imageCover,
    },
  },
  from: "Jane Doe",
};

export const ReceivedMessageWithBook = Template.bind({});
ReceivedMessageWithBook.args = {
  msg: {
    to: "Jane Doe",
    from: "John Doe",
    textMsg: "Hey, I'm interested in your book!",
    time: new Date().toLocaleString(),
    book: {
      title: "The Hobbit",
      price: "400",
      bookOwner: "John Doe",
      frontCover: imageCover,
    },
  },
  from: "Jane Doe",
};
