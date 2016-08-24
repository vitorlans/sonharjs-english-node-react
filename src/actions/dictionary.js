export function getDefine(word) {
    return fetch('http://localhost:8080/api/define?keyword=' + word);
}