import defineWord from 'define-word-promise';

exports.defineByKeyword = function(req, res) {

    if(!req.query.keyword){ return res.status(400).send({ message: "parametro keyword não pode ser vazio." }); }
    //if(!req.query.engine){ return res.status(400).send({ message: "parametro engine não pode ser vazio." }); }
        // require("define-word").synonyms("geography")
        defineWord.define(req.query.keyword).then(function (res1) {
            res.send(res1);
            }).catch(function(err) {
            console.log('err',err);
        });
        
};


