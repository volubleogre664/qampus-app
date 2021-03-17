export default function reducer(state, action) {
  switch (action.type) {
    case "SET_PATH": {
      return {
        ...state,
        path: action.payload.path,
      };
    }

    default:
      return state;
  }
}
