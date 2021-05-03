import { useState, useRef } from "react";
import { Button } from "@material-ui/core";

import { useForm } from "../../../utils/hooks";
import { useBooksHelpers, useUserHelpers } from "../../../Redux/getSlices";

import "./Upload.css";

function Upload() {
  //Data from redux state, dispatch -> function to update redux state
  const [{ user }] = useUserHelpers();
  const [{ book }, dispatchBooks] = useBooksHelpers();

  //References for input[file] to be accessed since it is hidden and cannot be clicked
  const frontCoverInputRef = useRef(null);
  const backCoverInputRef = useRef(null);

  //Data to be sent to backend server and saved to mongoDB
  const { onChange, onSubmit, values } = useForm(null, {
    isbn: "",
    moduleCode: "",
    price: "",
    studentNumber: user?.studentNumber || "",
  });

  //Book covers urls to go to src of img tag
  const [bookCovers, setBookCovers] = useState({
    frontCover: book?.frontCover || "",
    backCover: book?.backCover || "",
  });

  //Handling file inputs onChange
  const handleFileInput = (event) => {
    const [file] = event.target.files;

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setBookCovers({
        ...bookCovers,
        [event.target.name]: e.target.result,
      });

      dispatchBooks({
        type: "SET_BOOK_COVER",
        payload: {
          coverName: event.target.name,
          file: e.target.result,
        },
      });
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="upload">
      <h1 className="upload__title">Upload a book</h1>

      <form onSubmit={onSubmit} className="upload__form">
        <div className="wrapper">
          <div
            className="box"
            onClick={() => frontCoverInputRef.current.click()}
          >
            <div className="upload-options">
              <label className="front">
                Front Cover
                <input
                  type="file"
                  name="frontCover"
                  className="image-upload"
                  accept="image/*"
                  multiple="false"
                  ref={frontCoverInputRef}
                  onChange={handleFileInput}
                />
              </label>
            </div>

            <div id="front" className="js--image-preview">
              <img src={bookCovers.frontCover} alt="" className="thumb" />
            </div>
          </div>

          <div
            className="box"
            onClick={() => backCoverInputRef.current.click()}
          >
            <div className="upload-options">
              <label className="back">
                Back Cover
                <input
                  type="file"
                  name="backCover"
                  multiple="false"
                  className="image-upload"
                  ref={backCoverInputRef}
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
            </div>

            <div className="js--image-preview">
              <img src={bookCovers.backCover} alt="" className="thumb" />
            </div>
          </div>
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
            placeholder=""
          />
        </label>

        {/* <label htmlFor="bookTitle">
          Book Title: <br />
          <input
            type="text"
            name="title"
            id="bookTitle"
            required
            onChange={onChange}
            value={values.title}
            className="formInput"
            placeholder=""
          />
        </label> */}

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
            placeholder=""
          />
        </label>

        {/* <label htmlFor="authors">
          Authors: <br />
          <input
            type="text"
            name="authors"
            id="authors"
            required
            onChange={onChange}
            value={values.authors}
            className="formInput"
            placeholder=""
          />
        </label> */}

        <label htmlFor="price">
          Asking Price (R): <br />
          <input
            type="number"
            name="price"
            id="price"
            required
            onChange={onChange}
            value={values.price}
            className="formInput"
            placeholder=""
          />
        </label>

        {/* <label htmlFor="edition">
          Edition: <br />
          <input
            type="number"
            name="title"
            id="edition"
            onChange={onChange}
            value={values.edition}
            className="formInput"
            placeholder=""
          />
        </label> */}

        <Button className="formSubmitBtn" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default Upload;
