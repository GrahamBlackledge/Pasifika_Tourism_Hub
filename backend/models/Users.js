const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedRef = new Schema({
  countrySlug: { type: String, required: true },
 activityId:  { type: String, required: true },  
}, { _id: false });

const userSchema = new Schema({
  firebaseUid:  { type: String, required: true, unique: true },
  displayName:  String,
  email:        String,
  likedActivities: [likedRef]         
});

module.exports = mongoose.model('User', userSchema);