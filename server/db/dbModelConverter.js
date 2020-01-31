const convertDatabaseUser = dbUser => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    submittedPhotos: dbUser.submitted_photos,
    registredTime: dbUser.registred_time
  };
};

module.exports = {
  convertDatabaseUser
};
