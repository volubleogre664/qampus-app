import { useRef } from "react";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

import { useUserHelpers } from "../../Redux/getSlices";
import defaultImg from "../../account-home.png";

import "./ProfileImage.css";

function ProfileImage() {
  const [{ imgCrop }, dispatch] = useUserHelpers();
  const fileInputRef = useRef(null);

  const handleFileInput = (inputEvent) => {
    const [file] = inputEvent.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        dispatch({
          type: "SET_CROP_IMG",
          payload: { ...imgCrop, imgSrc: readerEvent.target.result },
        });
      };

      window.scrollTo(0, 0);

      reader.readAsDataURL(file);
    }

    inputEvent.target.src = "";
  };

  return (
    <div className="profileImage">
      <input
        type="file"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div className="add_div" onClick={() => fileInputRef.current.click()}>
        <span className="add_span">
          <AddAPhotoOutlinedIcon className="add" />
        </span>
        <img
          className="image"
          src={imgCrop.croppedImgUrl || defaultImg}
          alt=""
        />
      </div>
    </div>
  );
}

export default ProfileImage;
