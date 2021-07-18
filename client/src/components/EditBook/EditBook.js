import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { EDIT_BOOK } from "../../utils/graphql";

import "./EditBook.css";

const EditBook = ({ price = 350, title = "Test Book", id, cancel }) => {
  const { onChange, onSubmit, values } = useForm(editBookClicked, {
    isBought: false,
    price: price,
  });

  const [editBook] = useMutation(EDIT_BOOK, {
    variables: { id, isBought: values.isBought, price: values.price },
  });

  function editBookClicked() {
    editBook();
  }

  return (
    <div className="editBook">
      <h3 className=".title--light">Edit book</h3>
      <hr />
      <p>Book: {title}</p>

      <form onSubmit={onSubmit}>
        <ToggleSwitch
          name="isBought"
          title={title}
          value={values.isBought}
          onChange={onChange}
          label="Mark book as sold"
        />

        <Input
          name="price"
          label="Price (R)"
          onChange={onChange}
          value={values.price}
          id="price"
          required={true}
          type="number"
          placeholder={values.price}
        />

        <div className="editBook__footer">
          <Button onClick={cancel} text="cancel" />
          <Button type="submit" text="Edit Book" />
        </div>
      </form>
    </div>
  );
};

export default EditBook;
