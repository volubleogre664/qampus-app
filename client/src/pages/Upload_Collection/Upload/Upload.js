import React, { useState } from "react";
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
  

  function initImageUpload(box) {
  let uploadField = box.querySelector('.image-upload');

  uploadField.addEventListener('change', getFile);

  function getFile(e){
    let file = e.currentTarget.files[0];
    checkType(file);
  }
  
  function previewImage(file){
    let thumb = box.querySelector('.js--image-preview'),
        reader = new FileReader();

    reader.onload = function() {
      thumb.style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
    thumb.className += ' js--no-default';
  }

  function checkType(file){
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      throw 'Datei ist kein Bild';
    } else if (!file){
      throw 'Kein Bild gewählt';
    } else {
      previewImage(file);
    }
  }
  
}

// initialize box-scope
var boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  initDropEffect(box);
  initImageUpload(box);
}



/// drop-effect
function initDropEffect(box){
  let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;
  
  // get clickable area for drop effect
  area = box.querySelector('.js--image-preview');
  area.addEventListener('click', fireRipple);
  
  function fireRipple(e){
    area = e.currentTarget
    // create drop
    if(!drop){
      drop = document.createElement('span');
      drop.className = 'drop';
      this.appendChild(drop);
    }
    // reset animate class
    drop.className = 'drop';
    
    // calculate dimensions of area (longest side)
    areaWidth = getComputedStyle(this, null).getPropertyValue("width");
    areaHeight = getComputedStyle(this, null).getPropertyValue("height");
    maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));

    // set drop dimensions to fill area
    drop.style.width = maxDistance + 'px';
    drop.style.height = maxDistance + 'px';
    
    // calculate dimensions of drop
    dropWidth = getComputedStyle(this, null).getPropertyValue("width");
    dropHeight = getComputedStyle(this, null).getPropertyValue("height");
    
    // calculate relative coordinates of click
    // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
    x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10)/2);
    y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10)/2) - 30;
    
    // position drop and animate
    drop.style.top = y + 'px';
    drop.style.left = x + 'px';
    drop.className += ' animate';
    e.stopPropagation();
    
  }
}




  return (
    <div className="upload">
      <h1 className="upload__title">Upload a book</h1>

      <form onSubmit={onSubmit} className="upload__form">

        <div className="wrapper">
          <div className="box" >
            <div id="thumb" className="js--image-preview" ></div>
               <div className="upload-options">
                <label >
                  Front Cover
                  <input type="file" class="image-upload" className="image-upload" accept="image/*"/>
                </label>
            </div>
          </div>

          <div className="box">
            <div id="thumb" className="js--image-preview"></div>
            <div className="upload-options">
              <label>
                Back Cover
                <input type="file" class="image-upload" className="image-upload" accept="image/*"/>
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
