const { sequelize } = require('./util/database');
const { Profile } = require('./models/profile');
const { User } = require('./models/user');

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

Profile.belongsTo(User);

const {
  addProfile,
  getProfiles,
  viewProfile,
  viewUserProfile,
  editProfile,
  deleteProfile,
} = require('./controllers/profile');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');

app.post('/register', register);
app.post('/login', login);

app.get('/viewprofile/:id', isAuthenticated, viewProfile);
app.get( '/allprofiles', isAuthenticated, getProfiles );
app.get('/user/profile/:userId', isAuthenticated, viewUserProfile)
app.post('/user/profile', isAuthenticated, addProfile);
app.put('/user/profile/edit/:userId', isAuthenticated, editProfile);
app.delete('/user/profile/delete/:id', isAuthenticated, deleteProfile);

sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
  })
  .catch((err) => console.log(err));
