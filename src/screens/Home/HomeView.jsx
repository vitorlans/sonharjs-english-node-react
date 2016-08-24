import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';
import { ImageWidget } from 'shared/components/ImageWidget';
import { DictionaryWidget } from 'shared/components/DictionaryWidget';
import { TranslateWidget } from 'shared/components/TranslateWidget';
import { getImages } from 'actions/search';
import { getDefine } from 'actions/dictionary';


export class HomeView extends Component {
       constructor(props) {
            super(props);
            
            this.state = {
                searchWord: "This",
                dataImages: [],
                dataDefine: {}
            };
        }
        
        componentWillMount() {
                
        }
                
        componentDidMount() {
            this.findServer(this.state.searchWord);
        }
        
        componentWillUnmount() {
                
        }

        findServer(wordSearch){
            let context = this;
            getImages(wordSearch).then(function(response) {
                return response.json();
            }).then(function(json) {
                context.setState({dataImages: json});
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });

            getDefine(wordSearch).then(function(response) {
                return response.json();
            }).then(function(json) {
                context.setState({dataDefine: json});
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
        }

        onSearch(wordSearch){
            this.setState({searchWord: wordSearch});
            this.findServer(wordSearch);
        }

        render() {
            
        return (
            <div className="app--padding app--margin-top">
               <div className="app--center-block">
                    <SearchWidget onSearch={this.onSearch.bind(this)} />
               </div>
               <div>
                    <h1 className="w3-center">{this.state.searchWord}</h1>
               </div>
               <div>
                    <h2>1. Experience:</h2>
               </div>
               <div>
                    <ImageWidget data={this.state.dataImages} />
               </div>
               <div className="app--margin-top">
                    <h2>2. Definition</h2>
               </div>
               <div>
                    <DictionaryWidget word={this.state.searchWord} data={this.state.dataDefine} />
               </div>
               {
               /*<div className="app--margin-top">
                    <h2>3. Translate</h2>
               </div>
               <div>
                    <TranslateWidget />
               </div>*/}
            </div>
        );
    }
}