import express from 'express';
import {authenticate} from '../middlewares';
import apicache from 'apicache';

import map from 'lodash/map';

import jwt from 'jsonwebtoken';
import Word from '../models/word';

import {getUserByCredential, insertDocument} from '../connections/repository.db';
import isEmpty from 'lodash/isEmpty';

import {gettranslates} from '../connections/lingualeo';
import translate from 'google-translate-api';
import defineWord from 'define-word-promise';
import Scraper from 'images-scraper';

let router = express.Router();
let cache = apicache.middleware;

router.get("/", cache("20 minutes"), async(req, res) => {

    if (!req.query.keyword) {
        return res
            .status(400)
            .send({message: "parametro keyword não pode ser vazio."});
    }

    let bing = new Scraper.Bing();

    let leoapi = await gettranslates(req.query.keyword).then((data) => {
        return data;
    });
    let def = await defineWord
        .define(req.query.keyword)
        .then((data) => {
            return data;
        });
    // let trans = await translate(req.query.keyword, { from:'en', to:
    // 'pt'}).then((data) => {return data; });
    let images = await bing
        .list({keyword: req.query.keyword, num: 10, detail: true})
        .then((data) => {
            return data;
        });

    let response = new Word();
    response.word = req.query.keyword;
    response.soundurl = leoapi.sound_url;
    response.type = def.type;
    response.transcription = leoapi.transcription;
    response.definitions = def.definitions;

    response.translates = map(leoapi.translate, (t) => {
        return t.value;
    });

    response.images = map(images, (i) => {
        return {url: i.url, thumb: i.thumb};
    });

    res.send(response);
});

router.post("/add", authenticate, (req, res) => {

    if (!req.body.sentence) {
        return res
            .status(400)
            .send({message: "sentence is required"});
    }
    if (!req.body.translation) {
        return res
            .status(400)
            .send({message: "translation is required"});
    }

    var data = new Date();
    let word = {
        "sentence": req.body.sentence,
        "translation": req.body.translation,
        "date": data
    };

    getUserByCredential(req.currentUser.credential).then((resp) => {
        if (isEmpty(resp.docs)) 
            res.json({success: false, message: 'User not found.'});
        else {
            let user = resp.docs[0];
            if ("words" in user) {
                let obj = user.words.find((element) => {
                    return element.sentence.toUpperCase() === word.sentence.toUpperCase();
                });

                if (!obj) {
                    user.words.push(word);
                    insertDocument(user).then((data) => {
                        res.send(user.words);
                    });
                } else {
                    res.send(user.words);
                }

            } else {
                user.words = [word];
                insertDocument(user).then((data) => {
                      res.send(user.words);
                });
            }

        }
    });

});

router.get("/remove", authenticate, (req, res) => {

    if (!req.query.sentence) {
        return res
            .status(400)
            .send({message: "sentence is required"});
    }

    getUserByCredential(req.currentUser.credential).then((resp) => {
        if (isEmpty(resp.docs)) 
            res.json({success: false, message: 'User not found.'});
        else {
            let user = resp.docs[0];
            if ("words" in user) {
                let index = user
                    .words
                    .findIndex((element) => {
                        return element
                            .sentence
                            .toUpperCase() === req
                            .query
                            .sentence
                            .toUpperCase();
                    });

                if (index >= 0) {
                    user
                        .words
                        .splice(index, 1);

                    insertDocument(user).then((data) => {
                        res.send(user.words);
                    });
                } else {
                    res.send(user.words);
                }

            } else {
                res.send([]);
            }

        }
    });

});

router.get("/mysaved", authenticate, (req, res) => {

    getUserByCredential(req.currentUser.credential).then((resp) => {
        if (isEmpty(resp.docs)) 
            res.json({success: false, message: 'User not found.'});
        else {
            let user = resp.docs[0];
            res.send(user.words);
        }
    });
});

router.get("/define", (req, res) => {
    if (!req.query.keyword) {
        return res
            .status(400)
            .send({message: "parametro keyword não pode ser vazio."});
    }
    // if(!req.query.engine){ return res.status(400).send({ message: "parametro
    // engine não pode ser vazio." }); }
    // require("define-word").synonyms("geography")
    defineWord
        .define(req.query.keyword)
        .then(function (res1) {
            res.send(res1);
        })
        .catch(function (err) {
            res.sendStatus(404);
        });
});

router.get("/translate", (req, res) => {

    if (!req.query.keyword) {
        return res
            .status(400)
            .send({message: "parametro keyword não pode ser vazio."});
    }

    translate(req.query.keyword, {
        from: 'en',
        to: 'pt'
    }).then(response => {
        res.send(response);
    }).catch(err => {
        console.error(err);
    });

});

router.get("/imageresource", (req, res) => {

    let google = new Scraper.Google();
    let bing = new Scraper.Bing();
    let yahoo = new Scraper.Yahoo();
    let pics = new Scraper.Picsearch();

    if (!req.query.keyword) {
        return res
            .status(400)
            .send({message: "parametro keyword não pode ser vazio."});
    }
    // if(!req.query.engine){ return res.status(400).send({ message: "parametro
    // engine não pode ser vazio." }); }

    switch (req.query.engine) {

        case "1":
            google
                .list({keyword: req.query.keyword, num: 10, detail: true})
                .then(function (res1) {
                    res.send(res1);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
            break;

        case "2":
            bing
                .list({keyword: req.query.keyword, num: 10, detail: true})
                .then(function (res1) {
                    res.send(res1);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
            break;

        case "3":
            yahoo
                .list({keyword: req.query.keyword, num: 10, detail: true})
                .then(function (res1) {
                    res.send(res1);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
            break;

        case "4":
            pics
                .list({keyword: req.query.keyword, num: 10, detail: true})
                .then(function (res1) {
                    res.send(res1);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
            break;
        default:
            bing
                .list({keyword: req.query.keyword, num: 10, detail: true})
                .then(function (res1) {
                    res.send(res1);
                })
                .catch(function (err) {
                    console.log('err', err);
                });
            break;

    }
});

export default router;