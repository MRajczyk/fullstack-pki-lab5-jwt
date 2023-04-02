import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export const saltRounds = 10 
const {Schema, model} = mongoose 

const UserSchema = new Schema({ 
  name: { 
    type: String, 
    trim: true, 
    required: true, 
  }, 
  email: { 
    type: String, 
    trim: true, 
    required: true, 
    unique: true, 
  }, 
  password: { 
    type: String, 
    trim: true, 
    required: true
  }, 
  role: { 
    type: String, 
    trim: true, 
    default: 'USER' 
  } 
}, 
{ 
  versionKey: false 
}) 

export const UserModel = model('User', UserSchema);

UserSchema.pre('save', function (next) { 
  this.password = bcrypt.hashSync(this.password, saltRounds) 
  next() 
})