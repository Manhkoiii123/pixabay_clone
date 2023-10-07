const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "SET_USER_NULL":
      return action.user;
    case "GET_USER":
      return state;
    default:
      return state;
  }
};


export default userReducer