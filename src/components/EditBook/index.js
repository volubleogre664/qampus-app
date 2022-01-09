import { useMutation } from "@apollo/react-hooks";
import { useForm } from "@utils/hooks";

import ToggleSwitch from "@components/ToggleSwitch";
import Input from "@components/Input";
import Button from "@components/Button";
import { EDIT_BOOK } from "@utils/graphql.js";
import { useBooksSlice } from "@redux/getSlices";

import "./EditBook.css";

const EditBook = ({ price, title, id, cancel }) => {
  const [, dispatchBook] = useBooksSlice();
  const { onChange, onSubmit, values } = useForm(editBookClicked, {
    isBought: false,
    price: price,
  });

  const [editBook] = useMutation(EDIT_BOOK, {
    onCompleted(data) {
      dispatchBook({
        type: "REPLACE_LIBRARY_BOOK",
        payload: data.editBook,
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  function editBookClicked() {
    editBook({
      variables: {
        bookId: id,
        price: Number(values.price),
        isBought: values.isBought,
      },
    });

    cancel();
  }

  return (
    <div className="editBook">
      <h3 className="title--light">Edit book</h3>
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
