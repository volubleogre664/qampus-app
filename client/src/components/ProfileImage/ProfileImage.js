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
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profileImage">
      <h1>{title}</h1>
      <input
        type="file"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div onClick={() => fileInputRef.current.click()}>
        <span>
          <AddAPhotoOutlinedIcon />
        </span>
        <img src={imgCrop.croppedImgUrl || defaultImg} alt="" />
      </div>
    </div>
  );
}

export default ProfileImage;
