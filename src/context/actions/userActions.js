export const SET_USER = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};
export const SET_USER_NULL = () => {
  return {
    type: "SET_USER_NULL",
    user: null,
  };
};
export const GET_USER = () => {
  return {
    type: "GET_USER",
  };
};
