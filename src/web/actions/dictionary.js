export function getDefine(word) {
    return fetch('/api/define?keyword=' + word);
}