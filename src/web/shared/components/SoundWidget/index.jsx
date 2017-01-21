import React, {Component, PropTypes} from 'react';
import ReactAudioPlayer from 'react-audio-player';

class SoundWidget extends Component {
    render() {
        return (
            <div>
                <ReactAudioPlayer src={this.props.url} />
            </div>
        );
    }
}

SoundWidget.propTypes = {
    url: React.PropTypes.string.isRequired
};

export default SoundWidget;