import { apiAxios } from "../helpers";

const fetchRecognitionStatistics = user => {
  return apiAxios
    .get(`/statistics/${user.id}`)
    .then(response => {
      return response.data;
    })
    .catch(handleApiError);
};

const updateRecognitionStatistics = user => {
  return apiAxios
    .put("/update-statistics", user)
    .then(response => {
      return response.data;
    })
    .catch(handleApiError);
};

const detectFaces = inputUrl => {
  return apiAxios.post("/recognize", { input: inputUrl }).then(response => {
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

export const userService = {
  fetchRecognitionStatistics,
  updateRecognitionStatistics,
  detectFaces
};
