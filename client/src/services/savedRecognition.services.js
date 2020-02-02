import { apiAxios } from "../helpers";

const getSavedRecognitions = user => {
  return apiAxios
    .get(`/recognitions`)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(handleApiError);
};

const saveRecognition = (user, description, photoUrl) => {
  const params = {
    user,
    description,
    photoUrl
  };
  return apiAxios
    .post("/save-recognition", params)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(handleApiError);
};

const handleApiError = error => {
  const { status, data } = error.response;
  if (status === 401) {
    // auto logout if 401 response returned from api
    window.location.reload(true);
  }

  return Promise.reject(data);
};

export const userService = {
  getSavedRecognitions,
  saveRecognition
};
