import { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import Compressor from "compressorjs";
import firebase from "firebase/app";

import Loader from "../../../components/Loader/Loader";

import { useForm } from "../../../utils/hooks";
import { useBooksHelpers, useUserHelpers } from "../../../Redux/getSlices";
import { UPLOAD_BOOK } from "../../../utils/graphql";

import "./Upload.css";

// I defined this here because it was not persistent
const bookCovers = {};

function Upload() {
  //Data from redux state, dispatch -> function to update redux state
  const [{ user }] = useUserHelpers();
  const [, dispatchBooks] = useBooksHelpers();

  //References for input[file] to be accessed since it is hidden and cannot be clicked
  const frontCoverInputRef = useRef(null);
  const backCoverInputRef = useRef(null);

  // control the showing and hiding of loading animation
  const [loading, setLoading] = useState({
    isLoading: false,
    message: "",
  });

  //Data to be sent to backend server and saved to mongoDB
  // Notice callUploadData as first arg in useForm
  const { onChange, onSubmit, values } = useForm(callUploadData, {
    isbn: "",
    title: "",
    subtitle: "",
    authors: "",
    price: "",
    description: "",
    moduleCode: "",
    studentNumber: user?.studentNumber || "",
    frontCover: "",
    backCover: "",
  });
<<<<<<< HEAD
  
  const [{src1}, setImg1] = useState({
    src1: placeholder,
=======

  // Book cover urls from firebase to send to database
  // Title, subtitle, authors and description will get from google books api
  const [bookUpload, setBookUpload] = useState({
    title: "",
    subtitle: "",
    authors: "",
    description: "",
>>>>>>> 8696acc175f2369b472a4b4bbf4b184b4d07b96f
  });

  // Sending data to the backend server
  // calling uploadData initiates the sending of data to server
  const [uploadData] = useMutation(UPLOAD_BOOK, {
    // variables -> Data we are sending to server
    variables: {
      ...values,
      authors: bookUpload?.authors,
      price: Number(values.price),
      title: bookUpload.title,
      subtitle: bookUpload.subtitle,
      description: bookUpload.description,
      frontCover: bookCovers?.frontCover || "",
      backCover: bookCovers?.backCover || "",
    },
    // update -> function to call if api call is successful
    update(_, { data: { uploadBook: book } }) {
      // update takes two args. the first i set to underscore because we dont need it
      // it won't be recorded in RAM. The second argument is an object and it reads:
      // go inside the object take data, go inside data take uploadBook and rename uploadBook to book
      dispatchBooks({
        type: "SET_BOOK_LIST",
        payload: book,
      });

      // remove the loading animation
      setLoading({
        ...loading,
        isLoading: false,
        message: "",
      });
    },
    // onError -> function to call if api call returns an error
    onError(err) {
      console.log(err?.graphQLErrors);
      console.log(err?.message);
      setLoading({
        ...loading,
        isLoading: false,
        message: "",
      });
    },
  });

  function callUploadData() {
    uploadData();
  }

  // Uploading images to firebase and getting image urls
  // This is called on form submit
  async function uploadImagesToCloud(e) {
    e.preventDefault();

    // Get book info from google books api
    await searchForBooks();

    // Setting up cloud storage paths for the images
    setLoading({
      isLoading: true,
      message: "Uploading Images",
    });
    const storageRef = firebase.storage().ref();
    const frontCoverRef = storageRef.child(`${user.id}/book/frontCover.jpg`);
    const backCoverRef = storageRef.child(`${user.id}/book/backCover.jpg`);

    // Makes sure that files are not uploaded if the alredy exist
    // If they don't exit then it is uploaded
    await validateFilesInCloud(frontCoverRef, frontCoverInputRef, "frontCover");
    await validateFilesInCloud(backCoverRef, backCoverInputRef, "backCover");

    // Sends data to the database
    setLoading({
      isLoading: true,
      message: "Saving book information",
    });

    onSubmit(e);
  }

  // Compress Images and upload them to cloud storage
  function compressAndUpload(file, cloudStorageRef) {
    // Compressing the file and upload it in the async success hook
    return new Promise(function (resolve, reject) {
      new Compressor(file, {
        quality: 0.2,
        async success(result) {
          await cloudStorageRef
            .put(result)
            .then(() => {
              resolve("Done");
              // console.log("File uploaded");
            })
            .catch((err) => {
              reject("Failed to upload image");
              console.log("Failed to upload Image to cloud", err);
            });
        },
        error(err) {
          reject("done");
          console.log(err.message);
        },
      });
    });
  }

  // Check if files exist with getMetaData()
  // File exists -> calls .then()
  // File does not exist -> calls .catch()
  // .finally() is always called
  async function validateFilesInCloud(storageRef, inputRef, urlContainer) {
    return storageRef
      .getMetadata()
      .then(async () => {
        await getUploadedUrl(storageRef, urlContainer);
      })
      .catch(async () => {
        await compressAndUpload(inputRef.current.files[0], storageRef);
      })
      .finally(async () => {
        // Check if you have image url then get it if its not available alredy
        if (!Object.keys(bookCovers).includes(urlContainer)) {
          await getUploadedUrl(storageRef, urlContainer);
        }
      });
  }

  // Gets the image url from firebase and prepare it for saving to database
  // storageRef -> reference to the image in cloud storage
  // urlContainer -> name of variable to send to database
  async function getUploadedUrl(storageRef, urlContainer) {
    return storageRef
      .getDownloadURL()
      .then((url) => {
        bookCovers[urlContainer] = url;
      })
      .catch((err) => console.log(err));
  }

  // Get book information from google books api with isbn
  async function searchForBooks() {
    setLoading({
      isLoading: true,
      message: "Finding book data",
    });
    // Now to deal with getting book info from books API
    // Need to set storage rules in firebase
    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${values.isbn}`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        const tempBook = result.items[0].volumeInfo;
        setLoading({
          ...loading,
          isLoading: false,
          message: "",
        });
        setBookUpload({
          ...bookUpload,
          title: tempBook.title,
          description: tempBook?.description || "",
          subtitle: tempBook?.subtitle || "",
          authors: tempBook?.authors.join(", ") || "",
        });
        // console.log(result);
      })
      .catch((err) => console.log(err));

    // console.log(bookUpload);
  }

  return (
    <div className="upload">
      {loading.isLoading && <Loader message={loading.message} />}
      <h1 className="upload__title">Upload a book</h1>

      <form onSubmit={uploadImagesToCloud} className="upload__form">
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
                  multiple={false}
                  ref={frontCoverInputRef}
                  onChange={onChange}
                />
              </label>
            </div>

            <div id="front" className="js--image-preview">
              <img src={values.frontCover} alt="" className="thumb" />
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
                  multiple={false}
                  className="image-upload"
                  ref={backCoverInputRef}
                  accept="image/*"
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="js--image-preview">
              <img src={values.backCover} alt="" className="thumb" />
            </div>
          </div>
        </div>

        <label htmlFor="isbn">
          Book ISBN: <br />
          <input
            type="text"
            name="isbn"
            id="isbn"
            required={true}
            onChange={onChange}
            value={values.isbn}
            className="formInput"
            placeholder="9789544007737"
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
            required={true}
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
