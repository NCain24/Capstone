const { Profile } = require('../models/profile');
const { User } = require('../models/user');

module.exports = {
  addProfile: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthday,
        occupation,
      } = req.body;
      await Profile.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthday,
        occupation,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log('Error in add profile controller');
      console.log(error);
      res.sendStatus(400);
    }
  },

  viewProfile: async (req, res) => {
    try {
      const { firstName, lastName } = req.params;
      const profile = await Profile.findAll({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
        include: [
          {
            model: User,
            required: true,
            attributes: ['first name', 'last name']
          }
        ]
      } );
      res.status(200).send(profile)
    } catch ( error ) {
      console.log('Error in view profile controller')
    }
  },

  editProfile: async (req, res) => {
    try {
      const { id } = req.params;
      await Profile.update({
        where: { id: +id },
      });
      res.sendStatus(200);
    } catch (error) {
      console.log('Error in edit profile controller');
      console.log(error);
      res.sendStatus(400);
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      await Profile.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log('Error in delete profile controller');
      console.log(error);
      res.sendStatus(400);
    }
  },
};
