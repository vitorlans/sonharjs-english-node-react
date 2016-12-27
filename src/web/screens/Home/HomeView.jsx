import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';
import { ImageWidget } from 'shared/components/ImageWidget';
import { DictionaryWidget } from 'shared/components/DictionaryWidget';
import { TranslateWidget } from 'shared/components/TranslateWidget';
import { getImages } from 'actions/search';
import { getDefine } from 'actions/dictionary';
import { getTranslate } from 'actions/translate';

// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import * as actionTranslate from 'actions/translate';

export default class HomeView extends Component {
       constructor(props) {
            super(props);
            
            this.state = {
                searchWord: "GO",
                dataImages: [],
                dataDefine: {}
            };
        }
        
        componentWillMount() {
                
        }

        render() {
            
        return (
            <div className="app--padding">
                <h1 className="w3-center">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non erat at dolor accumsan congue sit amet sodales massa. Praesent eu enim id odio finibus hendrerit. Praesent eget lacus luctus, imperdiet ipsum sit amet, sagittis turpis. Sed at dui euismod, elementum dui in, mollis arcu. Phasellus viverra cursus libero, molestie pulvinar tellus congue id. Curabitur eu tellus ut leo malesuada tempus at id purus. Sed viverra neque augue, ut egestas arcu rutrum quis.

Pellentesque sed ipsum a lorem suscipit dictum. Sed velit lorem, congue sit amet elit auctor, malesuada luctus nibh. Praesent aliquet odio velit, sed rhoncus arcu lacinia id. Integer venenatis ligula quis bibendum vehicula. Maecenas mollis sit amet augue at mollis. Proin ullamcorper semper ultrices. Donec sodales nibh id nisi cursus congue. Etiam odio augue, iaculis eu pretium ut, mollis ut ipsum. Aenean hendrerit accumsan lacus, in commodo neque imperdiet ac. Nullam vestibulum aliquam urna a imperdiet. Donec tincidunt lacus turpis. Etiam ut rhoncus neque. Cras sit amet lectus lacus. </h1>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         translate: state.traslate
//                    

//     };
// }

// // Get actions and pass them as props to to UserList
// //      > now UserList has this.props.selectUser
// function matchDispatchToProps(dispatch){
//     return bindActionCreators(actionTranslate, dispatch);
// }

// export default connect(mapStateToProps, matchDispatchToProps)(HomeView);