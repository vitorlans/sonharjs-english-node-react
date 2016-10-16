import React, {Component} from 'react';
import { getTranslate } from 'actions/translate';

export class TranslateWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            word: "",
            to: "",
            from: "",
            translate: ""
        };

    }

    componentWillMount() {
        if (!this.props.word) { return; }

        this.setState({ 'word': this.props.word });

        if (this.props.to) 
            this.setState({ 'to': this.props.to });
        
        if (this.props.from)
            this.setState({ 'from': this.props.from });
            
        this.translate(this.props.word);
    }

    componentDidMount() {

        //ja foi montado

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.word !== nextProps.word && nextProps.word) {
            this.setState({ 'word': nextProps.word });
            this.translate(nextProps.word);
        }

        if (this.props.to !== nextProps.to && nextProps.to)
            this.setState({ 'to': nextProps.to });

        if (this.props.from !== nextProps.from && nextProps.from)
            this.setState({ 'from': nextProps.from });
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
        const context = this;
        getTranslate(wordSearch).then(function (response) {
            return response.json();
        }).then(function (json) {
            context.setState({ 'translate': json.text });
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    }

    render() {
        return (
            <div className="w3-card-2 w3-round">

                <header className="w3-container w3-teal ">
                    <h1>{this.state.word.toUpperCase()}</h1>
                </header>

                <div className="w3-container">
                    <p>{this.state.to.toUpperCase()}</p>
                    <hr/>
                    <h5>{this.state.translate.toUpperCase()}</h5>
                </div>

            </div>

        );
    }
}
