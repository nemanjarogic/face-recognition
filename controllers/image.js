const updateSubmittedPhotos = (req, res,  db) => {
    const { id } = req.body;
    
    db('users').where('id', '=', id)
        .increment('submitted_photos', 1)
        .returning('submitted_photos')
        .then(submittedPhotos => {
            res.json(submittedPhotos[0]);
        })
        .catch(err => res.status(400).json('Unable to return submitted photos'))
};

module.exports = {
    updateSubmittedPhotos: updateSubmittedPhotos
};