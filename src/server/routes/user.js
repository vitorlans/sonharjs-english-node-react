import db from '../integrations/cloudant.db.js';

export function loginUser(req, res) {

    let query = {
        "selector": {
            "credential": "vitor_hs@live.com",
            "passkey":"vitor"
        },
    }

    db.find(query, (err, resp) => {
        res.send(resp);
    });

}; 