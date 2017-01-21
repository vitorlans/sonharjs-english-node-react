import React, {Component} from 'react';
import sortBy from 'lodash/sortBy';

class SavedWordsWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wordList: this.props.wordList && this.props.wordList instanceof Array
                ? this.organize(this.props.wordList)
                : []
        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({wordList: this.organize(nextProps.wordList)});
    }


    organize(wordList){
        let list = sortBy(wordList);
        list.reverse();
        return list;
    }

    onSelect(obj) {
        if (this.props.onWordClick) 
            this.props.onWordClick(obj.sentence);
        }
    
    onRemove(obj, event) {
        event.stopPropagation();

        if(this.props.onRemove)
            this.props.onRemove(obj);
    }

    render() {
        let rows = [];
        if (this.state.wordList) {     
            this.state.wordList.map((obj, key) => {
                    rows.push(
                        <li
                            className="cursor--pointer"
                            key={key}
                            onClick={this.onSelect.bind(this, obj)} >
                            <span
                                onClick={this.onRemove.bind(this, obj)}
                                className="w3-closebtn w3-padding">&times;</span>

                            <span className="w3-xlarge">{obj.sentence.toUpperCase()}</span><br/>
                            <span>{obj.translation}</span>
                        </li>
                    );
                });
        }
        return (
            <div>
                <h2>
                    <b className="w3-text-theme">My Saved Words</b>
                </h2>
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

SavedWordsWidget.propTypes = {
    wordList: React.PropTypes.arrayOf(React.PropTypes.shape({
       date: React.PropTypes.string.isRequired,
       sentence: React.PropTypes.string.isRequired,
       translation: React.PropTypes.string
    })),
    onWordClick: React.PropTypes.func,
    onRemove: React.PropTypes.func
};

export default SavedWordsWidget;