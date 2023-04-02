import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config.js";
// Validate email address
export async function validateEmailAccessibility(email) {
    return await UserModel.findOne({
        email: email,
    }).then((result) => {
        return !result;
    });
}

// Generate token
export const generateTokens = (req, user) => {
    const ACCESS_TOKEN = jwt.sign(
        {
            sub: user._id,
            rol: user.role,
            type: "ACCESS_TOKEN",
        },
        config.TOKEN_SECRET_JWT,
        {
            expiresIn: 120,
        }
    );

    const REFRESH_TOKEN = jwt.sign(
        {
            sub: user._id,
            rol: user.role,
            type: "REFRESH_TOKEN",
        },
        config.TOKEN_SECRET_JWT,
        {
            expiresIn: 480,
        }
    );

    return {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
    };
};

// Controller create user
export const createUser = async (req, res, next) => {
    await validateEmailAccessibility(req.body.email).then(async (valid) => {
        if (valid) {
            try {
                const createdUser = await UserModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                }).then((err, res) => {
                    if (err) 
                        next(err);                        
                });
                if(createUser) {
                    res.status(200).json({
                        message: "The user was created",
                    });
                }
            } catch (e) {
                res.status(400).json({message: "Missing request parameters"});
                console.log(e.message);
            }
            
        } else {
            res.status(409).json({
                message: "The request could not be completed due to a conflict",
            });
        }
    });
};

// Controller login user
export const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    const userDoc = await UserModel.findOne({email});
    try {
        const passwOk = bcrypt.compareSync(password, userDoc.password);
        if(passwOk) {
            res.json(generateTokens(req, userDoc));
        } 
        else {
            res.status(400).json('Wrong credentials!');
        }
    }
    catch(e) {
        res.status(400).json('Invalid params');
    } 
};

// Verify accessToken
export const accessTokenVerify = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: "Token is missing",
        });
    }
    const BEARER = "Bearer";
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(" ");
    if (AUTHORIZATION_TOKEN[0] !== BEARER) {
        return res.status(401).send({
            error: "Token is not complete",
        });
    }
    jwt.verify(AUTHORIZATION_TOKEN[1], config.TOKEN_SECRET_JWT, function (err) {
        if (err) {
            return res.status(401).send({
                error: "Token is invalid",
            });
        }
        next();
    });
};

// Verify refreshToken
export const refreshTokenVerify = (req, res, next) => {
    if (!req.body.refreshToken) {
        res.status(401).send({
            message: "Token refresh is missing",
        });
    }
    const BEARER = "Bearer";
    const REFRESH_TOKEN = req.body.refreshToken.split(" ");
    if (REFRESH_TOKEN[0] !== BEARER) {
        return res.status(401).send({
            error: "Token is not complete",
        });
    }
    jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, function (err, payload) {
        if (err) {
            return res.status(401).send({
                error: "Token refresh is invalid",
            });
        }
        UserModel.findById(payload.sub, function (err, person) {
            if (!person) {
                return res.status(401).send({
                    error: "Person not found",
                });
            }
            return res.json(generateTokens(req, person));
        });
    });
};