import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';
import { ImageWidget } from 'shared/components/ImageWidget';
import { DictionaryWidget } from 'shared/components/DictionaryWidget';
import { TranslateWidget } from 'shared/components/TranslateWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class WordView extends Component {
       constructor(props) {
            super(props);
            
            this.state = {
                searchWord: "",
                dataImages: [],
                dataDefine: {}
            };

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

        findServer(wordSearch){
            let context = this;

            if(!wordSearch)
                return;

            getImages(wordSearch).then(function(response) {
                return response.json();
            }).then(function(json) {
                context.setState({dataImages: json});
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });

            getDefine(wordSearch).then(function(response) {
                return response.json();
            }).then(function(json) {
                context.setState({dataDefine: json});
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });

        }

        onSearch(wordSearch){
            if(this.state.searchWord === wordSearch) return;
            
            this.setState({searchWord: wordSearch});
            this.findServer(wordSearch);
        }


        render() {
            
        return (
            <div className="app--padding">
            
               <div className="w3-section">
                    <SearchWidget onSearch={this.onSearch.bind(this)} />
               </div>

               <div  className="w3-section">
                    <h2 className="w3-center">{this.state.searchWord.toUpperCase()}</h2>
               </div>
               <div className="w3-section">
                    <h3>1. Experience:</h3>
               </div>
               <div className="w3-section">
                    <ImageWidget images={this.state.dataImages} />
               </div>
               <div className="w3-section">
                    <h3>2. Definition</h3>
               </div>
               <div  className="w3-section">
                    <DictionaryWidget word={this.state.searchWord} data={this.state.dataDefine} />
               </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}


export default connect(mapStateToProps)(WordView);