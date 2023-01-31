const { Profile } = require('../models/profile');

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

  getProfiles: async (req, res) => {
    try {
      // const { firstName } = req.params
      const allProfiles = await Profile.findAll();
      res.status(200).send(allProfiles);
    } catch (error) {
      console.log(error);
      console.log('Error getting all profiles');
    }
  },

  viewProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findAll({
        where: { id: +id },
      } );
      console.log(profile)
      res.status(200).send(profile);
    } catch ( error ) {
      console.log(error)
      console.log('Error in view profile controller');
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
