import "./Collection.scss"
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import PencilIcon from "@material-ui/icons/EditRounded";

//Book Variables
const book_title = "Database Principles";
const book_price = "R300,00";
const book_isbn = "998844212133";
const book_modCode = "CSIS3744";
const book_edition = "2nd";
const book_dateUploaded = "21 April 2021";

function Collection() {
  return (
    <div className="collection">
        <div className="coll_header">
            <p>Your books</p>
            <hr className="separator"/>
        </div>

        <div class="coll_wrapper">
            <div class="container">
                <div class="top"></div>
                <div class="bottom">
                    <div class="left">
                        <div class="details">
                            <h1>{book_title}</h1>
                            <p>{book_price}</p>
                        </div>
                        <div class="buttons">
                            <PencilIcon className="edit"/>
                            <DeleteIcon className="del"/>
                        </div>
                    </div>

                    <div class="right">
                        <div class="done">{/* Icon*/}</div>
                        <div class="details">
                            <h1>{book_title}</h1>
                            <p>Sold</p>
                        </div>
                        <div class="sold">{/* Icon*/}</div>
                    </div>
                </div>
            </div>

            <div class="inside">
                <div class="icon"><InfoIcon/></div>
                <div class="contents">
                    <p>
                        <b>ISBN: </b>{book_isbn} <br></br>
                        <b>Title: </b>{book_title} <br></br>
                        <b>Module Code: </b>{book_modCode} <br></br>
                        <b>Price: </b>{book_price} <br></br>
                        <b>Edition: </b>{book_edition} <br></br>
                        <b>Date Uploaded: </b>{book_dateUploaded} <br></br>
                    </p>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default Collection;
