import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "@material-ui/core";

import getCroppedImg from "../../utils/getCroppedImage";
import { useUserHelpers } from "../../Redux/getSlices";

import "react-image-crop/dist/ReactCrop.css";
import "./CropImage.css";

function CropImage() {
  const [{ imgCrop }, dispatch] = useUserHelpers();
  const [cropInfo, setCropInfo] = useState({
    src: null,
    crop: { unit: "px", x: 0, y: 0, width: 0, height: 0, aspect: 1 / 1 },
    croppedImageUrl: null,
  });

  let cropImage = imgCrop.imgSrc
    ? document.querySelector(".ReactCrop__image")
    : null;

  const onCropChange = (crop, percentCrop) => {
    setCropInfo({ ...cropInfo, crop: crop });
  };

  const onCropComplete = (crop) => {
    setCropInfo({ ...cropInfo, crop: crop });
  };

  const onImageLoaded = (image) => {
    // console.log(image);

    cropImage = image;
    let primarySide = image.height;
    if (image.naturalWidth < image.naturalHeight) {
      primarySide = image.width;
    }

    setCropInfo({
      ...cropInfo,
      crop: {
        ...cropInfo.crop,
        x: 0,
        y: 0,
        width: primarySide,
        height: primarySide,
      },
    });
    // console.log(cropImage);
    return false;
  };

  async function makeClientCrop(crop) {
    if (cropImage && crop.width && crop.height) {
      // console.log(cropImage);
      const croppedImageUrl = await getCroppedImg({
        image: cropImage,
        crop: crop,
        fileName: "newfile.webp",
      });

      dispatch({
        type: "SET_CROP_IMG",
        payload: { ...imgCrop, imgSrc: null, croppedImgUrl: croppedImageUrl },
      });
    }
  }

  const cancelCrop = () => {
    dispatch({
      type: "SET_CROP_IMG",
      payload: { imgSrc: null, croppedImgUrl: null },
    });
  };

  return (
    <div className="cropImg">
      <h1>Adjust Your Image</h1>
      <div className="cropper">
        {imgCrop.imgSrc && (
          <ReactCrop
            src={imgCrop.imgSrc}
            crop={cropInfo.crop}
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
            locked
            onComplete={onCropComplete}
            // style={{ left: `calc(50% - ${cropImage?.clientWidth / 2}px)` }}
          />
        )}
      </div>
      <div className="buttons">
        <Button onClick={cancelCrop}>Cancel</Button>
        <Button onClick={() => makeClientCrop(cropInfo.crop)}>Done</Button>
      </div>
    </div>
  );
}

export default CropImage;
