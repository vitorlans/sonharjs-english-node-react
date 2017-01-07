import request from 'request';

const url_api = "http://lingualeo.com";
const locales = ["pt", "ru" , "tr" , "es_LA"];
let locale = "pt";

export function gettranslates(word) {
    let endpoint = "api/gettranslates?word=";
    return new Promise(function (resolve) {

        let url =  url_api + "/" + locale + "/" + endpoint + word;
        request(url, (error, resp, body) => {
            resolve(JSON.parse(body));
        });
        
    });
}