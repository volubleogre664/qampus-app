import Input from "@components/Input";
import Button from "@components/Button";

import "./ConfirmBook.css";

function ConfirmBook({ values, uploadBook, onChange, cancelUpload }) {
  const confirmBookInfo = (e) => {
    e.preventDefault();
    uploadBook(e);
  };

  return (
    <div className="confirmBook">
      <h2>Confirm book details</h2>
      <hr />

      <form onSubmit={confirmBookInfo} className="confirmBook__form">
        <Input
          type="text"
          name="isbn"
          id="isbn"
          required={true}
          onChange={onChange}
          value={values.isbn}
          label="ISBN"
          placeholder="9789544007737"
        />

        <Input
          type="text"
          name="title"
          id="title"
          required={true}
          onChange={onChange}
          value={values.title}
          label="Title"
          placeholder="Enter book title"
        />

        <Input
          type="text"
          name="authors"
          id="authors"
          onChange={onChange}
          value={values.authors}
          label="Authors (Optional)"
          placeholder="Enter book author(s)"
        />

        <Input
          type="number"
          name="price"
          id="price"
          required={true}
          onChange={onChange}
          value={values.price}
          label="Price"
          placeholder="300"
        />

        <Input
          type="text"
          name="moduleCode"
          id="moduleCode"
          onChange={onChange}
          value={values.moduleCode}
          label="Module code (Optional)"
          placeholder="CSIS1664"
        />

        <div className="confirmBook__formFooter">
          <Button
            text="Discard"
            onClick={cancelUpload}
            className="discard__button"
          />
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </div>
  );
}

export default ConfirmBook;
