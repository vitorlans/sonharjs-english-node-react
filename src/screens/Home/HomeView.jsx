import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';
import { ImageWidget } from 'shared/components/ImageWidget';
import { DictionaryWidget } from 'shared/components/DictionaryWidget';
import { TranslateWidget } from 'shared/components/TranslateWidget';

export class HomeView extends Component {
    render() {
        return (
            <div className="app--padding app--margin-top">
               <div className="app--center-block">
                    <SearchWidget />
               </div>
               <div>
                    <h1 className="w3-center" >THINGS</h1>
               </div>
               <div>
                    <h2>1. Experience:</h2>
               </div>
               <div>
                    <ImageWidget />
               </div>
               <div className="app--margin-top">
                    <h2>2. Definition</h2>
               </div>
               <div>
                    <DictionaryWidget />
               </div>
               <div className="app--margin-top">
                    <h2>3. Translate</h2>
               </div>
               <div>
                    <TranslateWidget />
               </div>
            </div>
        );
    }
}