const db = require( '../models' );
const Member = db.member;

checkDuplicateEmails = ( req, res, next ) => {
    Member.findOne( {
        email: req.body.email
    } )
        .exec( ( err, member ) => {
        if ( err ) {
            res.status( 500 ).send( { message: err } )
            return
        }
        
        if ( member ) {
            res.status( 400 ).send( { message: 'Email address is taken, please use another Email address.' } )
            return
        }
        next()
    })
};

const verify = {
    checkDuplicateEmails
};

module.exports = verify