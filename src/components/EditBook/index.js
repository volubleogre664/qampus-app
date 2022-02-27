import { useMutation } from "@apollo/react-hooks";
import { useForm } from "@utils/hooks";

import ToggleSwitch from "@components/ToggleSwitch";
import CloseIcon from "@mui/icons-material/Close";
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
      // Still need to handle this
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
      <header>
        <h3>Edit your book</h3>
      </header>

      <p>Title: {title}</p>

      <button onClick={cancel}>
        <CloseIcon />
      </button>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="price">Price (R)</label>
          <input
            name="price"
            className="login__mainFormInput"
            onChange={onChange}
            value={values.price}
            id="price"
            required={true}
            type="text"
            placeholder={values.price}
          />
        </div>

        <ToggleSwitch
          name="isBought"
          title={title}
          value={values.isBought}
          onChange={onChange}
          label="Mark book as sold"
        />

        <div className="editBook__footer">
          <button type="submit">Finish</button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
