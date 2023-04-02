import { DataModel } from '../models/data.js' 
import { decodeJwt } from '../util/utij.js'

// Controller get users list 
export const getDataList = async (req, res, next) => { 
    //console.log(decodeJwt(req.headers.authorization.split(" ")[1]).rol)
    const data = await DataModel.find({requiredRole: decodeJwt(req.headers.authorization.split(" ")[1]).rol})
    //console.log(data)
    if (!data) { 
        res.status(401).send({message: "Unauthorized"}) 
        next(err) 
    } else { 
        res.json({status: "success", data: data}); 
    } 
}