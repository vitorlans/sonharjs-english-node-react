var Scraper = require ('images-scraper');
var google = new Scraper.Google();
var bing = new Scraper.Bing();
var yahoo = new Scraper.Yahoo();
var pics = new Scraper.Picsearch();


exports.imageByKeyword = function(req, res) {

    if(!req.query.keyword){ return res.status(400).send({ message: "parametro keyword não pode ser vazio." }); }
    //if(!req.query.engine){ return res.status(400).send({ message: "parametro engine não pode ser vazio." }); }

    switch(req.query.engine){

        case "1":
            google.list({
                keyword: req.query.keyword,
                num: 10,
                detail: true         
            })
            .then(function (res1) {
                res.send(res1);
            }).catch(function(err) {
                console.log('err',err);
            });
            break;

        case "2":
            bing.list({
                keyword: req.query.keyword,
                num: 10,
                detail: true         
            })
            .then(function (res1) {
                res.send(res1);
            }).catch(function(err) {
                console.log('err',err);
            });
            break;

        case "3":
            yahoo.list({
                keyword: req.query.keyword,
                num: 10,
                detail: true         
            })
            .then(function (res1) {
                res.send(res1);
            }).catch(function(err) {
                console.log('err',err);
            });
            break;

        case "4":
            pics.list({
                keyword: req.query.keyword,
                num: 10,
                detail: true         
            })
            .then(function (res1) {
                res.send(res1);
            }).catch(function(err) {
                console.log('err',err);
            });
            break;
        default:
            bing.list({
                keyword: req.query.keyword,
                num: 10,
                detail: true         
            })
            .then(function (res1) {
                res.send(res1);
            }).catch(function(err) {
                console.log('err',err);
            });
            break;
        
    }
};
