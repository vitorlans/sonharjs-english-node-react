import React, {Component} from 'react';

class WordLearnWidget extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            wordList: []
        };
    }
    
    componentDidMount() {
        let wordList = JSON.parse(localStorage.getItem("WordLearnList_SONHAR"));
        if(wordList)
            this.setState({"wordList": wordList});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.word !== nextProps.word && nextProps.word) {
            this.saveWord(nextProps.word);
        }
    }

    saveWord(word){
        var wordList = this.state.wordList;
        let obj = this.state.wordList.find((element) => { 
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
        this.state.wordList.map((obj, key) => {
                                    rows.push(<li key={key} onClick={this.onSelect.bind(this, obj)}>{obj}
                                    <span onClick={this.onRemove.bind(this, obj)} className="w3-closebtn w3-margin-right w3-medium">x</span>
                                    </li>);
                                });
        return (
            <div style={{"maxHeight": '150px', "overflow": 'auto'}} className="w3-row">
                <div className="w3-col">
                    <ul className="w3-ul w3-hoverable">
                    {rows}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WordLearnWidget;