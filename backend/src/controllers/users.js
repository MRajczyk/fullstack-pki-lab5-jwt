import { UserModel } from '../models/user.js'
import {decodeJwt} from "../util/utij.js";

// Controller get users list 
export const getUserList = async (req, res, next) => {
    const reqUserRole = decodeJwt(req.headers.authorization.split(" ")[1]).rol;
    if(reqUserRole !== "ADMIN") {
        res.status(401).send({message: "Unauthorized"});
        next();
        return;
    }
    const users = await UserModel.find({})
    //console.log(users)
    if (!users) { 
        res.status(401).send({message: "Unauthorized"}) 
        next()
    } else { 
        res.json({status: "success", users: users}); 
    } 
}