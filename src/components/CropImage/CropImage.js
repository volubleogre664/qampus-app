import { useState } from "react";
import Cropper from "react-cropper";

import { useUserSlice } from "../../Redux/getSlices";
import Button from "../Button/Button";

import "cropperjs/dist/cropper.css";
import "./CropImage.css";

export const CropImage = () => {
  const [{ imgCrop }, dispatch] = useUserSlice();
  const [image] = useState(imgCrop.imgSrc);
  const [cropper, setCropper] = useState();

  const closeWindow = (e) => {
    dispatch({
      type: "SET_CROP_IMG",
      payload: {
        ...imgCrop,
        croppedImgUrl: null,
        croppedBookImgUrl: null,
        imgSrc: null,
      },
    });
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      if (imgCrop.aspect === 1 / 1.4142)
        var croppedBookImgUrl = cropper.getCroppedCanvas().toDataURL();
      else var croppedImgUrl = cropper.getCroppedCanvas().toDataURL();

      dispatch({
        type: "SET_CROP_IMG",
        payload: {
          ...imgCrop,
          croppedImgUrl: croppedImgUrl || null,
          croppedBookImgUrl: croppedBookImgUrl || null,
          imgSrc: null,
        },
      });
    }
  };

  return (
    <div id="crop">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          paddingLeft: "20px",
          paddingRight: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1>Adjust Your Image</h1>

        <Cropper
          style={{ height: "70%" }}
          initialAspectRatio={imgCrop.aspect || 1}
          aspectRatio={imgCrop.aspect || 1}
          src={image}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />

        <div className="buttons">
          <Button text="Cancel" onClick={closeWindow} />
          <Button onClick={getCropData} text="Crop Image" />
        </div>
      </div>
    </div>
  );
};

export default CropImage;
