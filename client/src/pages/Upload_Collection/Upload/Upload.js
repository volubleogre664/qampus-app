import React from "react";
import { Button } from "@material-ui/core";

import { useForm } from "../../../utils/hooks";

import "./Upload.css";

function Upload() {
  const { onChange, onSubmit, values } = useForm({
    isbn: "",
    title: "",
    moduleCode: "",
    authors: "",
    price: "",
    edition: "",
    studentNumber: "",
  });

  return (
    <div className="upload">
      <h1 className="upload__title">Upload a book</h1>

      <form onSubmit={onSubmit}>
        <div className="bookFrontCover">
          <input type="file" name="frontCover" multiple="false" />
        </div>
        <div className="bookBackCover">
          <input type="file" name="backCover" multiple="false" />
        </div>

        <label htmlFor="isbn">
          Book ISBN: <br />
          <input
            type="text"
            name="isbn"
            id="isbn"
            required
            onChange={onChange}
            value={values.isbn}
            className="formInput"
            placeholder="9781118712092"
          />
        </label>

        <label htmlFor="bookTitle">
          Book Title: <br />
          <input
            type="text"
            name="title"
            id="bookTitle"
            required
            onChange={onChange}
            value={values.title}
            className="formInput"
            placeholder="Be Sharp With C#"
          />
        </label>

        <label htmlFor="moduleCode">
          Module Code: <br />
          <input
            type="text"
            name="moduleCode"
            id="moduleCode"
            required
            onChange={onChange}
            value={values.moduleCode}
            className="formInput"
            placeholder="CSIS 1664"
          />
        </label>

        <label htmlFor="authors">
          Authors: <br />
          <input
            type="text"
            name="authors"
            id="authors"
            required
            onChange={onChange}
            value={values.authors}
            className="formInput"
            placeholder="Steve Biko, JG Zuma"
          />
        </label>

        <label htmlFor="price">
          Asking Price [R]: <br />
          <input
            type="text"
            name="price"
            id="price"
            required
            onChange={onChange}
            value={values.price}
            className="formInput"
            placeholder="250"
          />
        </label>

        <label htmlFor="edition">
          Edition: <br />
          <input
            type="number"
            name="title"
            id="edition"
            onChange={onChange}
            value={values.edition}
            className="formInput"
            placeholder="3"
          />
        </label>

        <Button className="formSubmitBtn" type="submit">
          Upload Book
        </Button>
      </form>
    </div>
  );
}

export default Upload;
