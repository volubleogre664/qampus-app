const initState = {
  sideMenu: false,
  loggedIn: false,
  profile: false,
  path: "",
};

function rootReducer(state = initState, action) {
  switch (action.type) {
    case "sideMenu/sideMenuToggled": {
      return {
        ...state,
        sideMenu: !state.sideMenu,
      };
    }

    case "loggedIn/loggedInToggled": {
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    }

    case "profile/profileToggled": {
      return {
        ...state,
        profile: !state.profile,
      };
    }

    case "path/pathChanged": {
      console.log(action);
      return {
        ...state,
        path: action.payload.path,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
