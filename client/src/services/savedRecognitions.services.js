import { apiAxios } from "../helpers";

const getOriginalPhotoUrl = (shortCode, userId) => {
  return apiAxios
    .get(`/original-photo?shortCode=${shortCode}&userId=${userId}`)
    .then(response => {
      return response.data;
    });
};

const getSavedRecognitions = user => {
  return apiAxios.get(`/recognitions/${user.id}`).then(response => {
    return response.data;
  });
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

export const savedRecognitionsService = {
  getSavedRecognitions,
  saveRecognition,
  getOriginalPhotoUrl
};
