import lingualeo from '../integrations/lingualeo';

exports.gettranslates = function(req, res) {

    if(!req.query.keyword){ return res.status(400).send({ message: "parametro keyword não pode ser vazio." }); }
        
        lingualeo
        .gettranslates(req.query.keyword)
        .then((data) => {
            res.send(data);
        });

};
