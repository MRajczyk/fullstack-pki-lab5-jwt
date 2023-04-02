import { DataModel } from '../models/data.js' 
import { decodeJwt } from '../util/utij.js'

export const getPublicData = async (req, res, next) => {
    const data = await DataModel.find({$or:[{requiredRole: ""}]});

    //console.log(data)
    if (!data) {
        res.status(401).send({message: "Unauthorized"})
        next()
    } else {
        res.json({status: "success", data: data});
    }
}

export const getLoggedUserData = async (req, res, next) => {
    const reqUserRole = decodeJwt(req.headers.authorization.split(" ")[1]).rol;
    if(reqUserRole !== "USER" && reqUserRole !== "ADMIN") {
        res.status(401).send({message: "Unauthorized"});
        next();
        return;
    }

    const data = await DataModel.find({$or:[{requiredRole: ""}, {requiredRole: 'USER'}]});
    //console.log(data)
    if (!data) {
        res.status(401).send({message: "Unauthorized"});
        next();
    } else {
        res.json({status: "success", data: data});
    }
}

export const getAdminData = async (req, res, next) => {
    const reqUserRole = decodeJwt(req.headers.authorization.split(" ")[1]).rol;
    if(reqUserRole !== "ADMIN") {
        res.status(401).send({message: "Unauthorized"});
        next();
        return;
    }

    const data = await DataModel.find({$or:[{requiredRole: ""}, {requiredRole: 'USER'}, {requiredRole: 'ADMIN'}]});
    //console.log(data)
    if (!data) {
        res.status(401).send({message: "Unauthorized"});
        next();
    } else {
        res.json({status: "success", data: data});
    }
}
