import { apiAxios } from "../helpers";

const fetchRecognitionStatistics = user => {
  return apiAxios.get(`/statistics/${user.id}`).then(response => {
    return response.data;
  });
};

const updateRecognitionStatistics = user => {
  return apiAxios.put("/update-statistics", user).then(response => {
    return response.data;
  });
};

const detectFaces = inputUrl => {
  return apiAxios.post("/recognize", { input: inputUrl }).then(response => {
    return response.data;
  });
};

export const userService = {
  fetchRecognitionStatistics,
  updateRecognitionStatistics,
  detectFaces
};
