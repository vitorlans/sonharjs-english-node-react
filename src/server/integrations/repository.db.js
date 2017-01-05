import db from './cloudant.db';

export function getByCredential(credential){
    let query = {
        "selector": {
            "credential": credential
        }
    };

    return db.find(query);
}

export function insertDocument(doc) {
   
   return db.insert(doc);  
}