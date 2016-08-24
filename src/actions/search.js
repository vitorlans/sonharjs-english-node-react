export function getImages(word) {
    return fetch('http://localhost:8080/api/image?keyword=' + word);
}
