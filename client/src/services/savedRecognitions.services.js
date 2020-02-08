import { apiAxios } from "../helpers";

const getOriginalPhotoUrl = (shortCode, userId) => {
  return apiAxios
    .get(`/original-photo?shortCode=${shortCode}&userId=${userId}`)
    .then(response => {
      return response.data;
    });
};

const getSavedRecognitions = user => {
  return apiAxios
    .get(`/recognitions/${user.id}`)
    .then(response => {
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
  return apiAxios.post("/save-recognition", params).then(response => {
    return response.data;
  });
};

const handleApiError = error => {
  const { status, data } = error.response;
  if (status === 401) {
    // auto logout if 401 response returned from api
    window.location.reload(true);
  }

  return Promise.reject(data);
};

export const savedRecognitionsService = {
  getSavedRecognitions,
  saveRecognition,
  getOriginalPhotoUrl
};
