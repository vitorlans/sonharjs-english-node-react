import React, {Component} from 'react';

export class TranslateWidget extends Component {

    componentWillMount() {

    }

    componentDidMount() {

        //ja foi montado

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.word !== nextProps.word && nextProps.word) {
            this.setState({ 'word': nextProps.word });
            this.translate(nextProps.word);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.word !== nextProps.word) || (this.state.translate !== nextState.translate);
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    translate(wordSearch) {
        
    }

    render() {
        return (
            <div className="w3-card-2 w3-round">

                <header className="w3-container w3-teal ">
                    <h1></h1>
                </header>

                <div className="w3-container">
                    <p></p>
                    <hr/>
                    <h5></h5>
                </div>

            </div>

        );
    }
}
