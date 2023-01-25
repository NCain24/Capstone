const express = require( 'express' );
const { authJwt } = require( '../middleware' )
const controller = require('../controllers/member.controller')
const router = express.Router();
const Member = require( '../models/member' );
const app = express()

module.exports = ( app ) => {
  app.use( req, res, next => {
    res.header( 'Access-Control-Allow-Headers', 'Origin, Content-Type, Accept' )
    next()
  }) 
}

app.get( '/api/public', controller.publicAccess )
app.get('/api/user', [authJwt.tokenVerify], controller.userAccess)

router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const specificMember = await Member.findById(req.params.id);
    res.json(specificMember);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post( '/', ( req, res ) => {
  console.log('hit')
  const post = new Member({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    occupation: req.body.occupation,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.deleteOne({ _id: req.params.id });
    res.json(deletedMember);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
