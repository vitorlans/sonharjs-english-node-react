import jwt from 'jsonwebtoken';
import User from '../models/user';
import { getByCredential, insertDocument } from '../integrations/repository.db';
import _ from 'lodash';

export function loginUser(req, res) {

    getByCredential(req.body.credential).then((resp) => {
        if (_.isEmpty(resp.docs)) 
            res.json({success: false, message: 'Authentication failed. User not found.'});
        else {
            let user = new User(resp.docs[0].name, resp.docs[0].credential, resp.docs[0].passkey);
            console.log(user);
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

}

export function addWord(req, res) {

    if(!req.body.sentence){ return res.status(400).send({ message: "sentence is required" }); }
    if(!req.body.translation){ return res.status(400).send({ message: "translation is required" }); }

    var data = new Date();
    let word = {
        "sentence": req.body.sentence,
        "translation": req.body.translation,
        "date": data.toLocaleDateString("pt-BR")
    };

    let verifyObj = verifyAuth(req);
    if(verifyObj.success){
        getByCredential(verifyObj.decoded.credential).then((resp) => {
            console.log(resp);
            if (_.isEmpty(resp.docs)) 
                res.json({success: false, message: 'User not found.'});
            else {
                let user = resp.docs[0];
                if("words" in user) {
                    user.words.push(word);
                } else{
                    user.words = [word];
                }
                
                insertDocument(user).then((data) => {
                    res.send(data);
                });

            }   
        });
    }else {
        res.send(verifyObj);
    }
}

export function getWord(req, res) {

    let verifyObj = verifyAuth(req);
    if(verifyObj.success){
        getByCredential(verifyObj.decoded.credential).then((resp) => {
            if (_.isEmpty(resp.docs)) 
                res.json({success: false, message: 'User not found.'});
            else {
                let user = resp.docs[0];
                res.send(user.words);
            }   
        });
    }
}

function verifyAuth(req) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        try{
            let decoded = jwt.verify(token, 'superSecret');
            return {success: true, message: 'Authenticate token is fine.', token: token, decoded: decoded};
        } catch(err) {
            return {success: false, message: 'Failed to authenticate token.', token: null, decoded: null};
        }

    } else {
        return {success: false, message: 'Authenticate token not found.', token: null, decoded: null};
    }
}
