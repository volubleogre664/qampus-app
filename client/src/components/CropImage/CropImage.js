import { useState } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import "./CropImage.css";

import { useUserHelpers } from "../../Redux/getSlices";

export const CropImage = () => {
  const [{ imgCrop }, dispatch] = useUserHelpers();
  const [image] = useState(imgCrop.imgSrc);
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      dispatch({
        type: "SET_CROP_IMG",
        payload: {
          ...imgCrop,
          croppedImgUrl: cropper.getCroppedCanvas().toDataURL(),
          imgSrc: null,
        },
      });
    }
  };

  return (
    <div>
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
          style={{ height: 70 + "%", width: "100%" }}
          initialAspectRatio={1}
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
          <button>Cancel</button>
          <button onClick={getCropData}>Crop Image</button>
        </div>
      </div>

      {/* <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} /> */}
    </div>
  );
};

export default CropImage;
