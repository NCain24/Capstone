require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const membersRoute = require('./routes/member.route');
const cookieSession = require('cookie-session');
const app = express();
const { SERVER_PORT } = process.env;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
const db = require('./models');
require('./routes/auth.route');
require('./routes/member.route');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/members', membersRoute);
app.use(
  cookieSession({
    name: 'session',
    secret: 'COOKIE_SECRET',
    httpOnly: true,
  })
);
app.use('/login', (req, res) => {
  res.send({
    token: 'testtest',
  });
});

mongoose.set('strictQuery', true);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once('open', () =>
  console.log('MongoDB database connection established successfully')
);

app.get('/', (req, res) => {
  res.json({ message: 'This is working.' });
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
