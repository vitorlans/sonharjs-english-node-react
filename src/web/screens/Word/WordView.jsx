import React, {Component} from 'react';

class WordView extends Component {
    render() {
        return (
            <div>
                <SearchWidget></SearchWidget>
                <div>
                    <ImageWidget>
                    </ImageWidget>
                </div>
                <div>
                    <DictionaryWidget>
                    </DictionaryWidget>
                </div>
                <div>
                    <TranslateWidget>
                    </TranslateWidget>
                </div>
            </div>
        );
    }
}

export default WordView;