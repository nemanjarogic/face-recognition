export const getPlainLoggedInUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return {
    id: user.id,
    token: user.token
  };
};
