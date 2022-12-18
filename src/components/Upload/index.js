import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  ref,
  getStorage,
  getMetadata,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import imageCompression from "browser-image-compression";
import Button from "@components/Button";
import Loader from "@components/Loader";
import Input from "@components/Input";
import ConfirmBook from "./ConfirmBook";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "@utils/hooks";
import { UPLOAD_BOOK } from "@utils/graphql";
import { useBooksSlice, useUserSlice, useUtilsSlice } from "@redux/getSlices";
import "./UploadBook.css";

// I defined this here because it was not persistent
let bookCovers = {};

function UploadBook({ app, callback }) {
  const [{ user, imgCrop }, dispatchUser] = useUserSlice();
  const [, dispatchBooks] = useBooksSlice();
  const [, dispatchUtils] = useUtilsSlice();

  //References for input[file] to be accessed since it is hidden and cannot be clicked
  const frontCoverInputRef = useRef(null);
  const firebaseStorage = getStorage(app);

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
    authors: "",
    price: "",
    moduleCode: "",
    bookOwner: user.id,
  });

  // Title, subtitle, authors and description will get from google books api
  const [bookUpload, setBookUpload] = useState({
    title: "",
    authors: "",
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
      frontCover: bookCovers?.frontCover,
    },
    // update -> function to call if api call is successful
    update(_, { data: { uploadBook: book } }) {
      // update takes two args. the first i set to underscore because we dont need it
      // it won't be recorded in RAM. The second argument is an object and it reads:
      // go inside the object take data, go inside data take uploadBook and rename uploadBook to book
      dispatchBooks({
        type: "SET_LIBRARY_BOOK_LIST",
        payload: book,
      });

      // remove the loading animation
      setLoading({
        ...loading,
        isLoading: false,
        message: "",
      });

      dispatchUser({
        type: "SET_CROP_IMG",
        payload: {
          ...imgCrop,
          croppedBookImgUrl: null,
          aspect: null,
        },
      });

      bookCovers = {};
      callback();

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Book Uploaded",
          subtitle: "Your book was uploaded successfully.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
    // onError -> function to call if api call returns an error
    onError(err) {
      setLoading({
        ...loading,
        isLoading: false,
        message: "",
      });

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Book uploading failed",
          subtitle:
            "An error occured while saving your book, please try again.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
  });

  // Callback passed to useForm hook
  function callUploadData() {
    let vals = {
      ...values,
      authors: values.authors || bookUpload?.authors,
      price: Number(values.price),
      title: values.title || bookUpload.title,
      frontCover: bookCovers?.frontCover,
      bookOwner: user.id,
    };

    uploadData({
      variables: {
        ...vals,
      },
    });
  }

  // Cancel book upload
  const cancelUpload = () => {
    onChange({
      target: {
        name: "title",
        value: "",
      },
    });
    setBookUpload({
      ...bookUpload,
      authors: "",
    });
    setConfirmBook(false);
  };

  // Uploading images to firebase and getting image urls
  // This is called on form submit
  async function uploadImagesToCloud(e) {
    e.preventDefault();
    // Get book info from google books api

    if (imgCrop.croppedBookImgUrl === null) {
      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Book uploading failed",
          subtitle: "Please upload a book cover.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
      return;
    }

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

    console.log(values);
    console.log(bookCovers);

    const frontCoverRef = ref(
      firebaseStorage,
      `${user.id}/books/${values.title.replace(/ /g, "_")}.png`
    );

    // Makes sure that files are not uploaded if the already exist
    // If they don't exist then they're uploaded
    await validateFilesInCloud(
      frontCoverRef,
      imgCrop.croppedBookImgUrl,
      "frontCover"
    );

    // Sends data to the database
    setLoading({
      isLoading: true,
      message: "Saving book information",
    });

    onSubmit(e);
  }

  // Select Image and open the crop tool
  const openCropTool = async () => {
    const [file] = frontCoverInputRef.current.files;

    if (!file) return;
    const reader = new FileReader();

    let options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const newFile = await imageCompression(file, options);

    reader.onload = (readerEvent) => {
      dispatchUser({
        type: "SET_CROP_IMG",
        payload: {
          ...imgCrop,
          imgSrc: readerEvent.target.result,
          aspect: 1 / 1.4142,
        },
      });
    };

    reader.readAsDataURL(newFile);

    frontCoverInputRef.current.value = "";
  };

  // Check if files exist with getMetaData()
  // File exists -> calls .then()
  // File does not exist -> calls .catch()
  // .finally() is always called
  async function validateFilesInCloud(storageRef, imageDataUrl, urlContainer) {
    return getMetadata(storageRef)
      .then(async () => {
        await getUploadedUrl(storageRef, urlContainer);
      })
      .catch(async () => {
        let file = await imageCompression.getFilefromDataUrl(
          imageDataUrl,
          "bookCover.png"
        );

        file = await imageCompression(file, {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        await uploadBytes(storageRef, file)
          .then(() => {
            console.log("Image has been uploaded");
          })
          .catch((err) => {
            setLoading({ ...loading, isLoading: false });
            dispatchUtils({
              type: "DELETE_BOOK",
              payload: {
                title: "Book Uploading Failed",
                subtitle:
                  "An error occured while uploading a book, please try again.",
                btnCancel: false,
                btnContinue: true,
                bookTitle: "",
                popupShow: true,
              },
            });
          });
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
    return getDownloadURL(storageRef)
      .then((url) => {
        bookCovers[urlContainer] = url;
      })
      .catch((err) => console.log(err));
  }

  // Get book information from google books api with isbn
  async function searchForBooks() {
    setLoading({
      isLoading: true,
      message: "Fetching book data",
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
        onChange({
          target: {
            name: "title",
            value: tempBook.title,
          },
        });
        setBookUpload({
          ...bookUpload,
          authors: tempBook?.authors.join(", ") || "",
        });
      })
      .catch((err) => {
        setLoading({ ...loading, isLoading: false, message: "" });
      });
  }

  const handleUploadCancel = () => {
    dispatchUser({
      type: "SET_CROP_IMG",
      payload: {
        ...imgCrop,
        croppedBookImgUrl: null,
        aspect: null,
      },
    });
    callback();
  };

  useEffect(() => {
    document.title = "Upload - Qampus";
  }, []);

  if (bookUpload.authors !== "" && values.authors !== bookUpload.authors) {
    onChange({
      target: {
        name: "authors",
        value: bookUpload.authors,
      },
    });
  }

  // The upload page starts here
  return (
    <div className="uploadPage">
      {confirmBook && (
        <ConfirmBook
          values={{ ...values }}
          onChange={onChange}
          cancelUpload={cancelUpload}
          uploadBook={confirmBookDetailsAndUpload}
        />
      )}

      {loading.isLoading && <Loader message={loading.message} />}
      <div className="upload">
        <header className="upload__header">
          <h1 className="upload__title">Book details</h1>
          <span
            role="button"
            onClick={handleUploadCancel}
            className="icon-container"
          >
            <CloseIcon />
          </span>
        </header>
        <form onSubmit={uploadImagesToCloud} className="upload__form">
          <div className="wrapper">
            <div
              role="button"
              className="box"
              onClick={() => frontCoverInputRef.current.click()}
            >
              <div id="front" className="js--image-preview">
                <img
                  src={imgCrop?.croppedBookImgUrl}
                  alt=""
                  className="thumb"
                />
              </div>
              <div className="upload-options">
                <label onClick={(e) => e.stopPropagation()} className="front">
                  Front Cover
                  <input
                    type="file"
                    name="frontCover"
                    className="image-upload"
                    accept="image/*"
                    multiple={false}
                    ref={frontCoverInputRef}
                    onChange={openCropTool}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="inputs">
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
              label="Module Code (Optional)"
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
          </div>

          <input type="hidden" name="title" value={values.title} />
          <input type="hidden" name="authors" value={values.authors} />

          <footer className="upload__formFooter">
            <Button text="Upload" type="submit" />
          </footer>
        </form>
      </div>
    </div>
  );
}

export default UploadBook;
