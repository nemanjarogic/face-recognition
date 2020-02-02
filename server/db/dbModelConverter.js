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

const getSavedUserRecognitions = dbRecognitions => {
  return dbRecognitions.map(recognition => {
    return {
      description: recognition.description,
      shortPhotoUrl: recognition.short_photo_url,
      originalPhotoUrl: recognition.original_photo_url,
      createdTime: recognition.created_time
    };
  });
};

module.exports = {
  convertDatabaseUser,
  getRecognitionStatisticsUser,
  getSavedUserRecognitions
};
