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

module.exports = {
  convertDatabaseUser
};
