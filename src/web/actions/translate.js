export function getTranslate(word) {
    return fetch('/api/translate?keyword=' + word);
        //.then(function (response) {
            //return response.json();
       // }).then(function (json) {
            //then
        //}).catch(function (ex) {
            //console.log('parsing failed', ex);
        //});
}