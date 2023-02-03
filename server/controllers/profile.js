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
        userId,
      } = req.body;
      const newProfile = await Profile.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthday,
        occupation,
        userId,
      });
      res.status(200).send(newProfile);
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
      });
      console.log(profile);
      res.status(200).send(profile);
    } catch (error) {
      console.log(error);
      console.log('Error in view profile controller');
    }
  },

  viewUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const userProfile = await Profile.findOne({
        where: { userId: userId },
      });
      res.status(200).send(userProfile);
    } catch (error) {
      res.sendStatus(400);
      console.log(error);
    }
  },

  editProfile: async (req, res) => {
    console.log('hit edit profile');
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthday,
        occupation,
      } = req.body;
      console.log(req.params);
      const editUserProfile = await Profile.update(
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          birthday,
          occupation,
        },
        {
          where: { id },
        }
      );
      console.log(editUserProfile);
      const profileUpdate = await Profile.findOne( {
          where: {id}
        })
      res.status(200).send(profileUpdate);
    } catch (error) {
      console.log('Error in edit profile controller');
      console.log(error);
      res.sendStatus(400);
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUserProfile = await Profile.destroy({ where: { id: +id } });
      res.status(200).send(deleteUserProfile);
    } catch (error) {
      console.log('Error in delete profile controller');
      console.log(error);
      res.sendStatus(400);
    }
  },
};
