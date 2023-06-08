import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditRounded";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices";
import useGQL from "@utils/graphqlHooks.js";
import {
  BLOCK_CONTACT,
  DELETE_CONTACT,
  UNBLOCK_CONTACT,
} from "../../utils/graphql";
import profilePlaceholder from "@assets/profile.png";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

import "./Profile.css";

function Profile() {
  const [{ user: loggedInUser, currentProfile }, dispatchUser] = useUserSlice();
  const [, dispatch] = useUtilsSlice();

  const user = currentProfile ?? loggedInUser;

  const [blockUserContact] = useGQL({
    type: "mutation",
    query: BLOCK_CONTACT,
    variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    onSuccess: (_, data) => {
      dispatch({
        type: "SET_POPUP",
        payload: {
          title: "Contact blocked",
          subtitle: "You have blocked this contact.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });

      dispatchUser({
        type: "SET_CURRENT_PROFILE",
        payload: { currentProfile: null },
      });

      document.querySelector(".app > .profile").classList.toggle("active");

      let blocked = loggedInUser?.blockedContacts ?? [];

      dispatchUser({
        type: "SET_USER",
        payload: {
          ...loggedInUser,
          blockedContacts: [...blocked, currentProfile?.id],
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [unblockUserContact] = useGQL({
    type: "mutation",
    query: UNBLOCK_CONTACT,
    variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    onSuccess: (_, data) => {
      dispatch({
        type: "SET_POPUP",
        payload: {
          title: "Contact unblocked",
          subtitle: "The contact has been unblocked.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });

      dispatchUser({
        type: "SET_USER",
        payload: {
          ...loggedInUser,
          blockedContacts: loggedInUser?.blockedContacts?.filter(
            (contact) => contact !== currentProfile?.id
          ),
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteUserContact] = useGQL({
    type: "mutation",
    query: DELETE_CONTACT,
    variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    onSuccess: (_, data) => {
      dispatch({
        type: "SET_POPUP",
        payload: {
          title: "Contact deleted",
          subtitle: "You have deleted this contact.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });

      dispatchUser({
        type: "SET_CURRENT_PROFILE",
        payload: { currentProfile: null },
      });

      document.querySelector(".app > .profile").classList.toggle("active");

      dispatchUser({
        type: "SET_USER",
        payload: {
          ...loggedInUser,
          contacts: loggedInUser.contacts.filter(
            (contact) => contact?.id !== currentProfile?.id
          ),
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const closeProfileClicked = (e) => {
    e.preventDefault();
    dispatchUser({
      type: "SET_CURRENT_PROFILE",
      payload: { currentProfile: null },
    });
    document.querySelector(".app > .profile").classList.toggle("active");
  };

  const logoutClicked = () => {
    dispatch({
      type: "LOGOUT",
      payload: {
        title: "Signing out?",
        subtitle: "Are you sure you want to sign out?",
        btnCancel: true,
        btnContinue: true,
        bookTitle: "",
        popupShow: true,
      },
    });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    dispatchUser({
      type: "SET_EDIT_PROFILE",
      payload: { edit: true },
    });
  };

  function deleteContact() {
    deleteUserContact({
      variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    });
  }

  function blockContact() {
    blockUserContact({
      variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    });
  }

  function unblockContact() {
    unblockUserContact({
      variables: { userId: loggedInUser?.id, contactId: currentProfile?.id },
    });
  }

  return (
    <aside className="profile">
      <header className="profile__header">
        <h2>Profile</h2>
        <span
          role="button"
          onClick={closeProfileClicked}
          className="icon-container"
        >
          <CloseIcon />
        </span>
      </header>

      <main className="profile__main">
        <header>
          <div className="profile__imageContainer">
            <img
              className="profile__image"
              src={user?.picture || profilePlaceholder}
              alt={(user && user.firstName + " " + user.lastName) || ""}
            />
          </div>

          <div className="some__info">
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <p>{user?.degree || ""}</p>

            <div className="profile__buttons">
              {user?.id === loggedInUser?.id && (
                <button onClick={handleEditProfile} className="profile__edit">
                  {/* <EditOutlinedIcon /> */}
                  Edit profile
                </button>
              )}
              
              {user?.id === loggedInUser?.id && (
                <button
                    onClick={() => logoutClicked()}
                    className="profile__footerButton"
                  >
                Sign Out
                </button>
              )}
            </div>

          </div>
        </header>

        {/* <main>
          <div>
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>

          {user?.university && (
            <div>
              <h4>Institution</h4>
              <p>{user?.university}</p>
            </div>
          )}

          {user?.campus && (
            <div>
              <h4>Campus</h4>
              <p>{user?.campus}</p>
            </div>
          )}

          {user?.gender && (
            <div>
              <h4>Gender</h4>
              <p>{user?.gender}</p>
            </div>
          )}
        </main> */}
      </main>

      <footer className="profile__footer">
        {user?.id !== loggedInUser?.id && (
          <>
            <button
              onClick={() => deleteContact()}
              className="profile__btn-red"
            >
              <DeleteIcon />
              <span>Delete {user?.firstName}</span>
            </button>

            {loggedInUser?.blockedContacts?.includes(user?.id) ? (
              <button
                onClick={() => unblockContact()}
                className="profile__btn-red restore"
              >
                <RestoreIcon />
                <span>Unblock {user?.firstName}</span>
              </button>
            ) : (
              <button
                onClick={() => blockContact()}
                className="profile__btn-red"
              >
                <BlockIcon />
                <span>Block {user?.firstName}</span>
              </button>
            )}
          </>
        )}
      </footer>
    </aside>
  );
}

export default Profile;
