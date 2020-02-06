const getUser = dbUser => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
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
      shortCode: recognition.short_code,
      createdTime: recognition.created_time
    };
  });
};

module.exports = {
  getUser,
  getRecognitionStatisticsUser,
  getSavedUserRecognitions
};
