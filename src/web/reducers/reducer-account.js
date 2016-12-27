export default function (state = { wordList: [] }, action) {
    switch (action.type) {
        case 'SAVE_WORD':
            if(!action.word) return state;
            var wordList = state.wordList;
            let obj = wordList.find((element) => {
                return element === action.word;
            });

            if (!obj) {
                wordList.push(action.word);
                localStorage.setItem("WordLearnList_SONHAR", JSON.stringify(wordList));
                state.wordList = wordList;
            }
            return state;
        case 'LOAD_WORDS_DATA':
            state.wordList = JSON.parse(localStorage.getItem("WordLearnList_SONHAR"));
            return state;

        default:
            return state;
    }
}