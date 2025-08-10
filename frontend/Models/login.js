var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }},
  {collection:'logindatabase'}
);

userSchema.pre('save',async function(next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

var login = module.exports = mongoose.model('what',userSchema);

module.exports.userRegister = function(registerBody) {
  const newUser = new login(registerBody);
  return newUser.save();
}
module.exports.userLogin = async function(email,password,username) {
  const [userbyEmail, userbyusername] = await Promise.all([
    login.findOne({email}).exec(),
    login.findOne({username}).exec(),
  ]); 
  return { userbyEmail,userbyusername };
}