export default function (state = { wordList: JSON.parse(localStorage.getItem("WordLearnList_SONHAR")) }, action) {
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

        default:
            return state;
    }
}