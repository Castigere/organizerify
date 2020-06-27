const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['active', 'incomplete', 'disabled']
    },
    displayName: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    mobileNumber: { type: String },
    language: {
      type: String,
      enum: ['en', 'no']
    },
    joinedAt: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ['administrator', 'member']
    },
    type: {
      type: String,
      enum: ['local', 'facebook', 'google']
    },
    facebook: {
      id: { type: String },
      token: { type: String }
    },
    google: {
      id: { type: String },
      token: { type: String }
    },
    logonMessage: {
      type: String
    }
  },
  {
    timestamps: true,
    strict: true
  }
);

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

exports.UserMongoSchema = mongoose.model('User', UserSchema);
