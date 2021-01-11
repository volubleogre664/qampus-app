const initState = {
  sideMenu: false,
  loggedIn: false,
  profile: false
}

function reducer(state = initState, action) {
  switch(action.type) {
    case "sideMenu/sideMenuToggled": {
      return {
        ...state, sideMenu: !state.sideMenu
      }
    }

    case "loggedIn/loggedInToggled": {
      return {
        ...state, loggedIn: !state.loggedIn
      }
    }

    case "profile/profileToggled": {
      return {
        ...state, profile: !state.profile
      }
    }

    default: return state;
  }
}

export default reducer;
