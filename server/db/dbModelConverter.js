const convertDatabaseUser = dbUser => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    submittedPhotos: dbUser.submitted_photos,
    recognizedFaces: dbUser.recognized_faces,
    registredTime: dbUser.registred_time
  };
};

const getRecognitionStatisticsUser = dbUser => {
  return {
    id: dbUser.id,
    submittedPhotos: dbUser.submitted_photos,
    recognizedFaces: dbUser.recognized_faces
  };
};

module.exports = {
  convertDatabaseUser,
  getRecognitionStatisticsUser
};
