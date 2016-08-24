exports.defineByKeyword = function(req, res) {

    if(!req.query.keyword){ return res.status(400).send({ message: "parametro keyword não pode ser vazio." }); }
    //if(!req.query.engine){ return res.status(400).send({ message: "parametro engine não pode ser vazio." }); }
        // require("define-word").synonyms("geography")
        var definit = require("define-word").define(req.query.keyword)
        var buff = "";
        //buff += text + " is a " + definit.type + "\n"
        //for (var i = 0; i < definit.definitions.length; i++) {
        //  buff += i + 1 + ". " + definit.definitions[i] + "\n"
        //}
        res.send(definit);
};


