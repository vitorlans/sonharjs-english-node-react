export function getImages(word) {
    return fetch('/api/image?keyword=' + word);
}
