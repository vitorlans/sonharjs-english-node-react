import React, {Component} from 'react';

class SavedWordsWidget extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            wordList: this.props.wordList
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.word !== nextProps.word && nextProps.word) {
            this.saveWord(nextProps.word);
        }
    }

    saveWord(word){
        var wordList = this.state.wordList;
        let obj = wordList.find((element) => { 
                return element === word;
        });
        
        if(!obj){
            wordList.push(word);
            localStorage.setItem("WordLearnList_SONHAR", JSON.stringify(wordList));
        }
    }
    
    onSelect(obj){
        if(this.props.onWordClick)
            this.props.onWordClick(obj);
    }
    
    onRemove(obj, event){
        event.stopPropagation();
        
        var wordList = this.state.wordList;
        let index = wordList.findIndex((element) => { 
                return element === obj;
        });

        if(index >= 0) {
            wordList.splice(index, 1);
            this.setState({"wordList" : wordList});
            localStorage.setItem("WordLearnList_SONHAR", JSON.stringify(wordList));
        }
    }


    //onclick="this.parentElement.style.display='none'" 
    //<span class="w3-badge w3-green w3-margin-left ">5</span>
    render() {
        let rows = [];
        if(this.state.wordList) {
        this.state.wordList.reverse();
        this.state.wordList.map((obj, key) => {
                                    rows.push(<li className="w3-padding-16 cursor--pointer" key={key} onClick={this.onSelect.bind(this, obj)}>{obj}
                                    <span onClick={this.onRemove.bind(this, obj)} className="w3-closebtn w3-margin-right w3-medium">x</span>
                                    </li>);
                                });
        }
        return (
            <div>
                <h2><b>My Saved Words</b></h2>
                <div className="w3-row">
                    <div className="w3-col">
                        <ul className="w3-ul w3-hoverable">
                        {rows}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SavedWordsWidget;