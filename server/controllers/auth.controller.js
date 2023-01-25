const config = require('../config/auth.config');
const db = require('../models');
const Member = db.member;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const member = new Member({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 5),
  });

  member.save((err, member) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Success!' });
  });
};

exports.signin = (req, res) => {
  Member.findOne({
    email: req.body.email,
  }).exec((err, member) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!member) {
      return res.status(404).send({ message: 'Member not found.' });
    }

    let validPassword = bcrypt.compareSync(req.body.password, member.password);

    if (!validPassword) {
      return res.status(401).send({ message: 'Incorrect password.' });
    }

    let token = jwt.sign({ id: member.id }, config.secret, {
      expiresIn: 86400,
    });

    req.session.token = token;

    res.status(200).send({
      id: member._id,
      email: member.email,
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: 'You have been signed out.' });
  } catch (error) {
    this.next(error);
  }
};