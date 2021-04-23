import Upload from "./Upload/Upload";
import "./UploadCollection.css";

function UploadCollection() {
  return (
    <div className="uploadCollection">
      <div className="upload_section">
        <Upload />
      </div>

      <div className="uploadCollection__collection"></div>
    </div>
  );
}

export default UploadCollection;
