import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { getUserByCredential } from '../connections/repository.db';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.post("/auth", (req, res) => {
    if(!req.body.credential){ return res.status(400).send({ message: "Credential is required" }); }
    if(!req.body.password){ return res.status(400).send({ message: "Password is required" }); }

    getUserByCredential(req.body.credential).then((resp) => {
        if (isEmpty(resp.docs)) 
            res.json({success: false, message: 'Authentication failed. User not found.'});
        else {
            let user = new User(resp.docs[0].name, resp.docs[0].credential, resp.docs[0].passkey);
            if (user) {
                // check if password matches
                if (user.passkey !== req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    var token = jwt.sign(user, 'superSecret', {
                        expiresIn: 180 // expires in 24 hours
                    });

                    res.send({success: true, token: token, user: user});
                }
            } else {
                res.json("An Unexpected error has occurred");
            }
        }
    });

});

router.post("/deauth", (req, res) => {
    
});

export default router;