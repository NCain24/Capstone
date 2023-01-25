const jwt = require( 'jsonwebtoken' );
const config = require( '../config/auth.config' );
const db = require( '../models' );
const Member = db.member;

tokenVerify = ( req, res, next ) => {
    let token = req.session.token

    if ( !token ) {
        return res.status(403).send({message: 'No session token found.'})
    }

    jwt.verify( token, config.secret, ( err, decoded ) => {
        if ( err ) {
            return res.status(401).send({message: 'Not authorized'})
        }
        req.userId = decoded.id
        next()
    })
};

const authJwt = {
    tokenVerify
};

module.exports = authJwt