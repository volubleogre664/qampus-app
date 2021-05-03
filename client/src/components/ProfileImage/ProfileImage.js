import { useRef } from "react";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

import { useUserHelpers } from "../../Redux/getSlices";
import defaultImg from "../../account-home.png";

import "./ProfileImage.css";

function ProfileImage({ title }) {
  const [{ imgCrop }, dispatch] = useUserHelpers();
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        dispatch({
          type: "SET_CROP_IMG",
          payload: { ...imgCrop, imgSrc: e.target.result },
        });

      window.scrollTo(0, 0);

      reader.readAsDataURL(file);
    }
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
