import { UserModel } from '../models/user.js' 

// Controller get users list 
export const getUserList = async (req, res, next) => { 
    const users = await UserModel.find({})
    //console.log(users)
    if (!users) { 
        res.status(401).send({message: "Unauthorized"}) 
        next(err) 
    } else { 
        res.json({status: "success", users: users}); 
    } 
}