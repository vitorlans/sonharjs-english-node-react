var translate = require('google-translate-api');

exports.translateByKeyword = function(req, res) {

    if(!req.query.keyword){ return res.status(400).send({ message: "parametro keyword não pode ser vazio." }); }

    translate(req.query.keyword, { from:'en', to: 'pt'}).then(response => {
         res.send(response);
    }).catch(err => {
        console.error(err);
    });
};

