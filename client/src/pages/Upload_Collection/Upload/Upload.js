import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useForm } from "../../../utils/hooks";
import placeholder from "@material-ui/icons/ClassRounded";
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
  
  //fix this
  const [{src1}, setImg1] = useState({
    src1: placeholder,
  });

  const [{src2}, setImg2] = useState({
    src2: placeholder,
  });

  const handleImg1 = (e) => {
    if(e.target.files[0]) {
        setImg1({
            src1: URL.createObjectURL(e.target.files[0]),
        });    
    }   
  }

  const handleImg2 = (e) => {
    if(e.target.files[0]) {
        setImg2({
            src2: URL.createObjectURL(e.target.files[0]),
        });    
    }   
  }

  return (
    <div className="upload">
      <h1 className="upload__title">Upload a book</h1>

      <form onSubmit={onSubmit} className="upload__form">

        <div className="wrapper">
          <div className="box" >
            <div id="front"className="js--image-preview" >
              <img src={src1} alt="" className="thumb"/>
            </div>
               <div className="upload-options">
                <label className="front" >
                  Front Cover
                  <input type="file" class="image-upload" className="image-upload" accept="image/*" onChange={handleImg1}/>
                </label>
            </div>
          </div>

          <div className="box">
            <div  className="js--image-preview">
              <img src={src2} alt="" className="thumb"/>
            </div>
            <div className="upload-options">
              <label className="back">
                Back Cover
                <input type="file" class="image-upload" className="image-upload" accept="image/*"onChange={handleImg2}/>
              </label>
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
            placeholder=""
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
            placeholder=""
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
            placeholder=""
          />
        </label>

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

        <label htmlFor="edition">
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
        </label>

        <Button className="formSubmitBtn" type="submit">
          Upload
        </Button>
      </form>
    </div>
  );
}

export default Upload;
