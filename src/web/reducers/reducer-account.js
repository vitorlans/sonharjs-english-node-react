export default function (state = { wordList: [] }, action) {
    switch (action.type) {
        case 'SAVE_WORD':
            return state;
        case 'LOAD_WORDS_DATA':
            return state;

        default:
            return state;
    }
}