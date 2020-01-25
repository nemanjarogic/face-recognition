import { apiAxios } from "../helpers";

const login = (email, password) => {
  return apiAxios
    .post("/login", { email, password })
    .then(response => {
      const { data: user } = response;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch(handleApiError);
};

const logout = () => {
  localStorage.removeItem("user");
};

const signUp = async user => {
  return apiAxios
    .post("/signup", user)
    .then(response => {
      return response.data;
    })
    .catch(handleApiError);
};

const handleApiError = error => {
  const { status, data } = error.response;
  if (status === 401) {
    // auto logout if 401 response returned from api
    logout();
    window.location.reload(true);
  }

  return Promise.reject(data);
};

export const authenticationService = {
  login,
  logout,
  signUp
};
