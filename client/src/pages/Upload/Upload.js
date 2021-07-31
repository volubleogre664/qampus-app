import { useState, useRef } from "react";
import Button from "../../components/Button/Button";
import { useMutation } from "@apollo/react-hooks";
import Compressor from "compressorjs";
import firebase from "firebase/app";

import Loader from "../../components/Loader/Loader";
import Input from "../../components/Input/Input";
import ConfirmBook from "./ConfirmBook";

import { useForm } from "../../utils/hooks";
import { useBooksHelpers, useUserHelpers } from "../../Redux/getSlices";
import { UPLOAD_BOOK } from "../../utils/graphql";

import "./Upload.css";

// I defined this here because it was not persistent
const bookCovers = {};

function Upload() {
  //Data from redux state, dispatch -> function to update redux state
  const [{ user }] = useUserHelpers();
  const [, dispatchBooks] = useBooksHelpers();

  //References for input[file] to be accessed since it is hidden and cannot be clicked
  const frontCoverInputRef = useRef(null);
  //const backCoverInputRef = useRef(null);

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
    // backCover: "",
  });

  // Book cover urls from firebase to send to database
  // Title, subtitle, authors and description will get from google books api
  const [bookUpload, setBookUpload] = useState({
    title: "",
    subtitle: "",
    authors: "",
    description: "",
  });

  // This is a hook for confirming the book data
  const [confirmBook, setConfirmBook] = useState(false);

  // Sending data to the backend server
  // calling uploadData initiates the sending of data to server
  const [uploadData] = useMutation(UPLOAD_BOOK, {
    // variables -> Data we are sending to server
    variables: {
      ...values,
      authors: values.authors || bookUpload?.authors,
      price: Number(values.price),
      title: values.title || bookUpload.title,
      subtitle: values.subtitle || bookUpload.subtitle,
      description: values.description || bookUpload.description,
      frontCover: bookCovers?.frontCover || "",
      // backCover: bookCovers?.backCover || "",
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

  // Callback passed to useForm hook
  function callUploadData() {
    uploadData();
  }

  // Cancel book upload
  const cancelUpload = () => setConfirmBook(false);

  // Uploading images to firebase and getting image urls
  // This is called on form submit
  async function uploadImagesToCloud(e) {
    e.preventDefault();

    // Get book info from google books api
    await searchForBooks();

    setConfirmBook(true);
  }

  // Confirm the info before upload
  async function confirmBookDetailsAndUpload(e) {
    setConfirmBook(false);

    // Setting up cloud storage paths for the images
    setLoading({
      isLoading: true,
      message: "Uploading Images",
    });
    const storageRef = firebase.storage().ref();

    // TODO: Still need to test this very thorouly because I am not sure about it yet
    const frontCoverRef = storageRef.child(
      `${user.id}/books/${bookUpload.title.replace(/ /g, "_")}_front.jpg`
    );

    // const backCoverRef = storageRef.child(
    //   `${user.id}/books/${bookUpload.title.replace(/ /g, "_")}_back.jpg`
    // );

    // Makes sure that files are not uploaded if the already exist
    // If they don't exist then they're uploaded
    await validateFilesInCloud(frontCoverRef, frontCoverInputRef, "frontCover");
    //wait validateFilesInCloud(backCoverRef, backCoverInputRef, "backCover");

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

  // TODO: Design the whole form for confirming book details and actually make it work the push (-_-)

  return (
    <div className="uploadCollection">
      {confirmBook && (
        <ConfirmBook
          values={{ ...values, ...bookUpload }}
          onChange={onChange}
          cancelUpload={cancelUpload}
          uploadBook={confirmBookDetailsAndUpload}
        />
      )}

      {loading.isLoading && <Loader message={loading.message} />}
      <div className="upload_section">
        <div className="upload">
          <h1 className="upload__title">Upload a book</h1>
          <hr className="upload_separator" />
          <form onSubmit={uploadImagesToCloud} className="upload__form">
            <div className="wrapper">
              <div className="box" onClick={() => frontCoverInputRef.current.click()} >
                <div id="front" className="js--image-preview">
                  <img src={values.frontCover} alt="" className="thumb" />
                </div>
                <div className="upload-options">
                  <label className="front">
                    Front Cover
                    <input
                      type="file"
                      name="frontCover"
                      className="image-upload"
                      accept="image/*"
                      multiple={false}
                      required={true}
                      ref={frontCoverInputRef}
                      onChange={onChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <Input
              type="text"
              name="isbn"
              id="isbn"
              required={true}
              onChange={onChange}
              value={values.isbn}
              label="Book ISBN"
              placeholder="9789544007737"
            />

            <Input
              type="text"
              name="moduleCode"
              id="moduleCode"
              onChange={onChange}
              value={values.moduleCode}
              label="Module Code"
              placeholder="CSIS1664"
            />

            <Input
              type="number"
              name="price"
              id="price"
              required={true}
              onChange={onChange}
              value={values.price}
              label="Asking Price (R)"
              placeholder="350"
            />

            <Button text="Upload" type="submit" />
          </form>
        </div>
      </div>
      <div className="bullets">
        <p className="list_tittle">Frequently asked questions</p>
        <ul className="tilesWrap">
          <li>
            <h2>01</h2>
            <h3>What if I don't remember the module code?</h3>
            <p>
              You can leave out the module code but your book will be harder to
              find when someone uses it as a search option.
            </p>
          </li>
          <li>
            <h2>02</h2>
            <h3>How long will my book stay on Qampus?</h3>
            <p>
             Your book will stay on the platform for six months, this is to ensure that 
             unsold textbooks don't remain on our databses for too long.
            </p>
          </li>
          <li>
            <h2>03</h2>
            <h3>How do I know when someone wants to buy my book?</h3>
            <p>
              When someone chooes to buy your book, you will get a message from them
              on the Qampus chat system. From there, you can arrange with them where
              and when to meet in order to make the exchange.
            </p>
          </li>
          <li>
            <h2>04</h2>
            <h3>What happens after I sell my book?</h3>
            <p>
              After selling your book, you should go to your book collection and update
              it's status to SOLD. After doing so, it will no longer be shown in the search 
              window and it will be saved on our system to increase your credibility.
            </p>
          </li>
          <li>
            <h2>05</h2>
            <h3>How do I get verified?</h3>
            <p>
              In order to get verified you must sell ten books on the platform. Alternatively,
              you can get 20 people to create an account - see the HELP
              window for more details.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Upload;
