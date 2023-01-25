exports.publicAccess = ( req, res ) => {
    res.status(200).send('Public')
};

exports.userAccess = ( req, res ) => {
    res.status(200).send('User')
}