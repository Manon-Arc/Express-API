const { Schema, model } = require('mongoose');

const UserExperience = new Schema({
  titre: { type: String, required: true },
  entreprise: { type: String, required: true },
  dates: { type: String, required: true },
  description: { type: String, required: true }
});

const UserInformation = new Schema({
  bio: { type: String, default: '' },
  localisation: { type: String, default: '' },
  siteWeb: { type: String, default: '' }
})

const UserProfile = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: {type: [UserExperience], default: []},
  skills: { type: [String], default: [] },
  information: UserInformation,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Profile = model('UserProfile', UserProfile);

module.exports = Profile;