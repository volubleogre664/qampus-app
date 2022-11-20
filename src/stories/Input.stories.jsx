import React from "react";

import Input from "../components/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    "[All html input props]": {
      description: "you can add any valid html input prop",
    },
    label: {
      description: "label for the input",
    },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Text input",
  placeholder: "Enter text here",
  type: "text",
  id: "text-input",
  value: "",
};

export const Password = Template.bind({});
Password.args = {
  label: "Password input",
  type: "password",
  id: "password-input",
  value: "some password",
};

export const Email = Template.bind({});
Email.args = {
  label: "Email input",
  type: "email",
  id: "email-input",
  placeholder: "jdoe@fake.co.za",
  value: "fakemail@whatever.co.za",
};
