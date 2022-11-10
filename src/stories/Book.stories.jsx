import React from "react";

import Book from "../components/Book";

export default {
  title: "Components/Book",
  component: Book,
  argTypes: {
    book: {
      description: "Book To Display",
      table: {
        type: {
          summary: "object",
          detail:
            "This is the book object that contains the book title, author, cover image, and description.",
        },
      },
    },

    state: {
      description: "State under which the book is being displayed.",
      table: {
        type: {
          summary: "string",
          detail:
            "This is the state under which the book is being displayed. It can be either 'search_result_book' or 'chats_book' and it defaults to 'storage_view'.",
        },
      },
    },
  },
};

const Template = (args) => <Book {...args} />;

const imageCover =
  "https://www.pluggedin.com/wp-content/uploads/2020/01/hobbit-cover-670x1024.jpg";

export const SearchResult = Template.bind({});
SearchResult.args = {
  state: "home_book_result",
  book: {
    title: "The Hobbit",
    price: "400",
    bookOwner: "John Doe",
    frontCover: imageCover,
  },
};

export const ChatView = Template.bind({});
ChatView.args = {
  state: "chats_book",
  book: {
    title: "The Hobbit",
    price: "400",
    bookOwner: "John Doe",
    frontCover: imageCover,
  },
};

export const StorageView = Template.bind({});
StorageView.args = {
  book: {
    title: "The Hobbit",
    price: "400",
    bookOwner: "John Doe",
    frontCover: imageCover,
  },
};
