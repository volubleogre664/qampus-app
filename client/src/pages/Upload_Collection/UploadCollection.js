import Upload from "./Upload/Upload";
import "./UploadCollection.css";

function UploadCollection() {
  return (
    <div className="uploadCollection">
      <div className="upload_section">
        <Upload />
      </div>
      <div className="bullets">
          <p className="list_tittle">Frequently asked questions</p> 
          <ul class="tilesWrap">
            <li>
              <h2>01</h2>
              <h3>What if I don't remember the module code?</h3>
              <p>
                You can leave out the module code but your book will be harder to find when someone uses it as a search option.
              </p>
            </li>
            <li>
              <h2>02</h2>
              <h3>Spend less on textbooks?</h3>
              <p>
              Save yourself thousands of rands in texbooks fees by buying used texbooks from students who are on your campus.              </p>
            </li>
            <li>
              <h2>03</h2>
              <h3>Never get lost on campus?</h3>
              <p>
              Do you have an unfamiliar class venue? Find your way around campus by using our navigation system.
              </p>
            </li>
            <li>
              <h2>04</h2>
              <h3>Meet more interesting people?</h3>
              <p>
              Connect with your peers who are registered on Qampus and get to know them better.
              </p>
            </li>
          </ul>
        </div>
      <div className="uploadCollection__collection"></div>
    </div>
  );
}

export default UploadCollection;
