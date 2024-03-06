import mongoose from 'mongoose';
import { mongoURI } from '../config/index.js';

mongoose.connect(mongoURI);

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  isAdmin : {
    type : Boolean, 
    required : true,
    default : false
    // default is user so it is false
  },
  // when seting the verification with the email id is required we can use this
  // temporarytoken : {
  //   type : String,
  //   required : true
  // }
});

const User = mongoose.model('User', userSchema);

export {
  User,
}
