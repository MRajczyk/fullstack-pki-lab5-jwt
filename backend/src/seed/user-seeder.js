import { UserModel } from '../models/user.js' ;
import { saltRounds } from '../models/user.js';
import bcrypt from "bcrypt";

async function doUsersExist() { 
  const exec = await UserModel.find().exec() 
  return exec.length > 0 
} 

// Initialize first user 
export const initializeUser = async () => { 
  if(!await doUsersExist()) { 
    const user = await UserModel.create({ 
        role: "ADMIN", 
        name: "admin", 
        email: "admin@admin.com", 
        password: bcrypt.hashSync('admin', saltRounds) 
      }) 
    
    let done = 0; 
    for (let i = 0; i < user.length; i++) { 
      user[i].save((err, result) => { 
        done++; 
      }) 
    } 
  } 
}