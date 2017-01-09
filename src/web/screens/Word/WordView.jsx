import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';
import { ImageWidget } from 'shared/components/ImageWidget';
import { DictionaryWidget } from 'shared/components/DictionaryWidget';
import { TranslateWidget } from 'shared/components/TranslateWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fetchSearchWord, changeSearchWord } from 'actions/word-action';

class WordView extends Component {
       constructor(props) {
            super(props);
            
            this.onSearch = this.onSearch.bind(this);
        }
        
        componentWillMount() {
                
        }
                
        componentDidMount() {
            const queryParams = this.props.location.query;

            if(queryParams && queryParams.w)
                this.onSearch(queryParams.w);
        }
        
        componentWillUnmount() {
                
        }


        onSearch(wordSearch){
            if(this.props.word.searchWord === wordSearch) return;
            
            this.props.changeSearchWord(wordSearch);
            this.props.fetchSearchWord(wordSearch);
        }


        render() {
            
        return (
            <div className="app--padding">
            
               <div className="w3-section">
                    <SearchWidget onSearch={this.onSearch} />
               </div>

               <div  className="w3-section">
                    <h2 className="w3-center">{this.props.word.searchWord.toUpperCase()}</h2>
               </div>
               <div className="w3-section">
                    <h3>1. Experience:</h3>
               </div>
               <div className="w3-section">
                    <ImageWidget images={this.props.word.resultSearch.images} />
               </div>
               <div className="w3-section">
                    <h3>2. Definition</h3>
               </div>
               <div  className="w3-section">
                    <DictionaryWidget definitions={this.props.word.resultSearch.definitions} />
               </div>
               <div className="w3-section">
                    <h3>3. Translation</h3>
               </div>
                <div  className="w3-section">
                    <TranslateWidget translates={this.props.word.resultSearch.translates} />
               </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        word: state.word
    };
}

function matchDispatchToProps(dispatch){
   return bindActionCreators({ "changeSearchWord": changeSearchWord, "fetchSearchWord" :fetchSearchWord }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WordView);