export const getAuthorizationHeader = () => {
  // return authorization header with JWT token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  }

  return {};
};
