export function saveWord(word) {
    return {
        type:'SAVE_WORD',
        word
    };
}

export function loadWords() {
    return {
        type:'LOAD_WORDS_DATA'
    };
}