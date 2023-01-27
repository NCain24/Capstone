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

User.hasMany(Profile);
Profile.belongsTo(User);

const {
  addProfile,
  viewProfile,
  editProfile,
  deleteProfile,
} = require('./controllers/profile');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');

app.post('/register', register);
app.post('/login', login);

app.get('/viewprofile/:userId', isAuthenticated, viewProfile);
app.post('/profile', isAuthenticated, addProfile);
app.put('/profile/:id', isAuthenticated, editProfile);
app.delete('/profile/:id', isAuthenticated, deleteProfile);

sequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
  })
  .catch((err) => console.log(err));
