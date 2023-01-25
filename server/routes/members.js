const express = require( 'express' );
const router = express.Router();
const Member = require('../models/Members')

router.get( '/', async ( req, res ) => {
    try {
        const members = await Member.find()
        res.json(members)
    } catch (error) {
        res.json({message: error})
    }
} );

router.get( '/:id', async ( req, res ) => {
    try {
        const specificMember = await Member.findById( req.params.id )
        res.json(specificMember)
    } catch (error) {
        res.json({message: error})
    }
})

router.post( '/', ( req, res ) => {
    const post = new Member( {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        occupation: req.body.occupation
    } )
    post.save()
        .then( data => {
        res.json(data)
        } )
        .catch( error => {
        res.json({message: error})
    })
} )

router.delete( '/:id', async ( req, res ) => {
    try {
        const deletedMember = await Member.deleteOne( { _id: req.params.id } )
        res.json(deletedMember)
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router