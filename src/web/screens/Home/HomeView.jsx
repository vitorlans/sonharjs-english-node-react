import React, {Component} from 'react';
import { SearchWidget } from 'shared/components/SearchWidget';

// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

export default class HomeView extends Component {
       constructor(props) {
            super(props);
            
            this.state = {
                searchWord: "GO",
                dataImages: [],
                dataDefine: {}
            };
            this.onSearch = this.onSearch.bind(this);
        }
        
        componentWillMount() {
                
        }

        onSearch(word){
            if(word) 
                this.props.router.push("/word?w="+ word);
        }

        render() {
            
        return (
            <div className="app--padding">
                <div className="w3-content">
                    <div className="w3-section w3-center">
                        <img className="w3-image" src="/images/welcome.png" style={{height: "250px"}}></img>
                    </div>
                    <div className="w3-section">
                        <SearchWidget onSearch={this.onSearch} title="Start typing any word." />                   
                    </div>
                </div>
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